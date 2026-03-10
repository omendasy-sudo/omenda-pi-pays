$ErrorActionPreference = "Stop"

$envFile = "c:\Users\OMENDA\OneDrive\omenda pi pays\tmtt_nextjs\.env.production"
$expectedKey = ""
$envDomain = ""

if (Test-Path $envFile) {
  $lines = Get-Content $envFile
  $expectedKey = (($lines | Where-Object { $_ -match '^PI_VALIDATION_KEY=' }) -replace '^PI_VALIDATION_KEY=', '').Trim()
  $envDomain = (($lines | Where-Object { $_ -match '^NEXT_PUBLIC_APP_URL=' }) -replace '^NEXT_PUBLIC_APP_URL=', '').Trim()
}

$targets = @(
  "https://omendapipaysglobel.online",
  "https://www.omendapipaysglobel.online"
)

if ($envDomain -and ($targets -notcontains $envDomain)) {
  $targets += $envDomain
}

function Test-ValidationKey([string]$baseUrl, [string]$key) {
  $url = ($baseUrl.TrimEnd('/')) + "/validation-key.txt"
  try {
    $res = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 25
    $body = ($res.Content | Out-String).Trim()
    $isHtml = $body -match '<html|<!doctype|<head|<body'
    $match = $false
    if ($key) { $match = ($body -eq $key) }

    return [pscustomobject]@{
      domain = $baseUrl
      target = $url
      status = [int]$res.StatusCode
      contentType = ($res.Headers['Content-Type'] -join ',')
      isHtml = $isHtml
      exactKeyMatch = $match
      result = (($res.StatusCode -eq 200) -and (-not $isHtml) -and $match)
      bodyLength = $body.Length
      sample = $body.Substring(0, [Math]::Min(100, $body.Length))
    }
  } catch {
    return [pscustomobject]@{
      domain = $baseUrl
      target = $url
      status = $null
      contentType = $null
      isHtml = $false
      exactKeyMatch = $false
      result = $false
      bodyLength = 0
      sample = $_.Exception.Message
    }
  }
}

$results = @()
foreach ($domain in $targets) {
  $results += Test-ValidationKey -baseUrl $domain -key $expectedKey
}

$summary = [pscustomobject]@{
  envDomain = $envDomain
  expectedKeyLength = $expectedKey.Length
  verifiedAt = (Get-Date).ToString("s")
  passedDomains = ($results | Where-Object { $_.result }).domain
  failedDomains = ($results | Where-Object { -not $_.result }).domain
  checks = $results
}

$summary | ConvertTo-Json -Depth 6
