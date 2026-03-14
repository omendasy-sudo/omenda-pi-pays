$ErrorActionPreference = "Stop"

$envFile = "c:\Users\OMENDA\OneDrive\omenda pi pays\tmtt_nextjs\.env.production"
$expectedKey = ""
$envDomain = ""
$skipWwwTlsUntilReady = $true

if (Test-Path $envFile) {
  $lines = Get-Content $envFile
  $expectedKey = (($lines | Where-Object { $_ -match '^PI_VALIDATION_KEY=' }) -replace '^PI_VALIDATION_KEY=', '').Trim()
  $envDomain = (($lines | Where-Object { $_ -match '^NEXT_PUBLIC_APP_URL=' }) -replace '^NEXT_PUBLIC_APP_URL=', '').Trim()
}

$targets = @(
  [pscustomobject]@{ url = "https://omendapipaysglobel.online"; allowTlsSkip = $false },
  [pscustomobject]@{ url = "https://www.omendapipaysglobel.online"; allowTlsSkip = $skipWwwTlsUntilReady }
)

if ($envDomain -and ($targets.url -notcontains $envDomain)) {
  $targets += [pscustomobject]@{ url = $envDomain; allowTlsSkip = $false }
}

function Get-DnsDiagnostic([string]$baseUrl) {
  try {
    $hostname = ([uri]$baseUrl).Host
    $addresses = [System.Net.Dns]::GetHostAddresses($hostname) |
      Select-Object -ExpandProperty IPAddressToString -Unique

    return [pscustomobject]@{
      host = $hostname
      resolved = ($addresses.Count -gt 0)
      addresses = $addresses
      error = $null
    }
  } catch {
    return [pscustomobject]@{
      host = $(try { ([uri]$baseUrl).Host } catch { $baseUrl })
      resolved = $false
      addresses = @()
      error = $_.Exception.Message
    }
  }
}

function Test-SslCertificate([string]$baseUrl) {
  $hostname = ([uri]$baseUrl).Host
  $port = 443
  $result = [pscustomobject]@{
    host             = $hostname
    connected        = $false
    subject          = $null
    issuer           = $null
    thumbprint       = $null
    notBefore        = $null
    notAfter         = $null
    daysUntilExpiry  = $null
    expired          = $null
    hostnameMatch    = $null
    trustedChain     = $null
    trusted          = $null
    error            = $null
  }

  try {
    $tcpClient = New-Object System.Net.Sockets.TcpClient
    $tcpClient.Connect($hostname, $port)
    $result.connected = $true

    $sslStream = New-Object System.Net.Security.SslStream(
      $tcpClient.GetStream(), $false,
      { param($s,$cert,$chain,$errors)
        $result.trustedChain  = ($errors -eq [System.Net.Security.SslPolicyErrors]::None)
        $result.trusted       = ($errors -eq [System.Net.Security.SslPolicyErrors]::None)
        $true   # always accept so we can inspect
      }
    )
    $sslStream.AuthenticateAsClient($hostname)

    $cert = $sslStream.RemoteCertificate -as [System.Security.Cryptography.X509Certificates.X509Certificate2]
    if ($cert) {
      $result.subject        = $cert.Subject
      $result.issuer         = $cert.Issuer
      $result.thumbprint     = $cert.Thumbprint
      $result.notBefore      = $cert.NotBefore.ToString("s")
      $result.notAfter       = $cert.NotAfter.ToString("s")
      $result.daysUntilExpiry = [int]($cert.NotAfter - (Get-Date)).TotalDays
      $result.expired        = ($cert.NotAfter -lt (Get-Date))
      # SAN / CN hostname match
      $san = $cert.Extensions | Where-Object { $_.Oid.FriendlyName -eq 'Subject Alternative Name' }
      if ($san) {
        $sanText = $san.Format($false)
        $result.hostnameMatch = ($sanText -match [Regex]::Escape($hostname) -or $sanText -match '\*\.' + ($hostname -replace '^[^.]+\.',''))
      } else {
        $cn = if ($cert.Subject -match 'CN=([^,]+)') { $Matches[1].Trim() } else { '' }
        $result.hostnameMatch = ($cn -eq $hostname -or ($cn.StartsWith('*.') -and $hostname -match ('.*\.' + [Regex]::Escape($cn.Substring(2)) + '$')))
      }
    }

    $sslStream.Close()
    $tcpClient.Close()
  } catch {
    $result.error = $_.Exception.Message
    if ($result.connected -eq $false -and $_.Exception.InnerException) {
      $result.error = $_.Exception.InnerException.Message
    }
  }

  return $result
}

function Test-ValidationKey([string]$baseUrl, [string]$key, [bool]$allowTlsSkip) {
  $url = ($baseUrl.TrimEnd('/')) + "/validation-key.txt"
  $dns = Get-DnsDiagnostic -baseUrl $baseUrl

  if (-not $dns.resolved) {
    return [pscustomobject]@{
      domain = $baseUrl
      target = $url
      dns = $dns
      status = $null
      contentType = $null
      isHtml = $false
      exactKeyMatch = $false
      result = $false
      effectiveResult = $false
      skipped = $false
      skipReason = $null
      bodyLength = 0
      sample = "DNS lookup failed: $($dns.error)"
    }
  }

  try {
    $res = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 25
    $body = ($res.Content | Out-String).Trim()
    $isHtml = $body -match '<html|<!doctype|<head|<body'
    $match = $false
    if ($key) { $match = ($body -eq $key) }

    return [pscustomobject]@{
      domain = $baseUrl
      target = $url
      dns = $dns
      status = [int]$res.StatusCode
      contentType = ($res.Headers['Content-Type'] -join ',')
      isHtml = $isHtml
      exactKeyMatch = $match
      result = (($res.StatusCode -eq 200) -and (-not $isHtml) -and $match)
      effectiveResult = (($res.StatusCode -eq 200) -and (-not $isHtml) -and $match)
      skipped = $false
      skipReason = $null
      bodyLength = $body.Length
      sample = $body.Substring(0, [Math]::Min(100, $body.Length))
    }
  } catch {
    $message = $_.Exception.Message
    $tlsTrustError = $message -match 'trust relationship|SSL/TLS secure channel|certificate'
    $shouldSkip = $allowTlsSkip -and $tlsTrustError

    return [pscustomobject]@{
      domain = $baseUrl
      target = $url
      dns = $dns
      status = $null
      contentType = $null
      isHtml = $false
      exactKeyMatch = $false
      result = $false
      effectiveResult = $shouldSkip
      skipped = $shouldSkip
      skipReason = $(if ($shouldSkip) { 'TLS certificate not ready for this host; skipped by policy.' } else { $null })
      bodyLength = 0
      sample = $message
    }
  }
}

$results = @()
foreach ($target in $targets) {
  $check = Test-ValidationKey -baseUrl $target.url -key $expectedKey -allowTlsSkip $target.allowTlsSkip
  $check | Add-Member -NotePropertyName ssl -NotePropertyValue (Test-SslCertificate -baseUrl $target.url)
  $results += $check
}

$summary = [pscustomobject]@{
  envDomain = $envDomain
  expectedKeyLength = $expectedKey.Length
  verifiedAt = (Get-Date).ToString("s")
  dnsSummary = @(
    $results | ForEach-Object {
      [pscustomobject]@{
        domain = $_.domain
        host = $_.dns.host
        resolved = $_.dns.resolved
        addresses = $_.dns.addresses
        dnsError = $_.dns.error
      }
    }
  )
  sslSummary = @(
    $results | ForEach-Object {
      [pscustomobject]@{
        host            = $_.ssl.host
        connected       = $_.ssl.connected
        trusted         = $_.ssl.trusted
        expired         = $_.ssl.expired
        daysUntilExpiry = $_.ssl.daysUntilExpiry
        hostnameMatch   = $_.ssl.hostnameMatch
        subject         = $_.ssl.subject
        issuer          = $_.ssl.issuer
        notAfter        = $_.ssl.notAfter
        sslError        = $_.ssl.error
      }
    }
  )
  passedDomains = ($results | Where-Object { $_.effectiveResult -and -not $_.skipped }).domain
  skippedDomains = ($results | Where-Object { $_.skipped }).domain
  failedDomains = ($results | Where-Object { -not $_.effectiveResult }).domain
  checks = $results
}

$summary | ConvertTo-Json -Depth 6
