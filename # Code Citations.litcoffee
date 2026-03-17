# Code Citations

## License: MIT
https://github.com/Vbubblery/blog/blob/12e3310f173fc2ae7689dfea68ae69464908ea25/_posts/2018-10-22-Node.js-Project-Online.md

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
```


## License: unknown
https://github.com/paulguerrero/paulguerrero.github.io/blob/dad8504f1280a4b4d493f767c5328438e6e928cc/misc/nginx.conf

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60
```


## License: Apache-2.0
https://github.com/mobiledgex/edge-cloud-infra/blob/a4b8cf11b76a8f355b9a59106db23c476c2332e9/ansible/templates/mexplat/console-nginx-config.j2

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_buffering off;
        proxy_hide_header X-Frame-Options;
```


## License: MIT
https://github.com/Vbubblery/blog/blob/12e3310f173fc2ae7689dfea68ae69464908ea25/_posts/2018-10-22-Node.js-Project-Online.md

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
```


## License: unknown
https://github.com/paulguerrero/paulguerrero.github.io/blob/dad8504f1280a4b4d493f767c5328438e6e928cc/misc/nginx.conf

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60
```


## License: Apache-2.0
https://github.com/mobiledgex/edge-cloud-infra/blob/a4b8cf11b76a8f355b9a59106db23c476c2332e9/ansible/templates/mexplat/console-nginx-config.j2

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_buffering off;
        proxy_hide_header X-Frame-Options;
```


## License: MIT
https://github.com/Vbubblery/blog/blob/12e3310f173fc2ae7689dfea68ae69464908ea25/_posts/2018-10-22-Node.js-Project-Online.md

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
```


## License: unknown
https://github.com/paulguerrero/paulguerrero.github.io/blob/dad8504f1280a4b4d493f767c5328438e6e928cc/misc/nginx.conf

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60
```


## License: Apache-2.0
https://github.com/mobiledgex/edge-cloud-infra/blob/a4b8cf11b76a8f355b9a59106db23c476c2332e9/ansible/templates/mexplat/console-nginx-config.j2

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_buffering off;
        proxy_hide_header X-Frame-Options;
```


## License: MIT
https://github.com/Vbubblery/blog/blob/12e3310f173fc2ae7689dfea68ae69464908ea25/_posts/2018-10-22-Node.js-Project-Online.md

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
```


## License: unknown
https://github.com/paulguerrero/paulguerrero.github.io/blob/dad8504f1280a4b4d493f767c5328438e6e928cc/misc/nginx.conf

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60
```


## License: Apache-2.0
https://github.com/mobiledgex/edge-cloud-infra/blob/a4b8cf11b76a8f355b9a59106db23c476c2332e9/ansible/templates/mexplat/console-nginx-config.j2

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_buffering off;
        proxy_hide_header X-Frame-Options;
```


## License: MIT
https://github.com/Vbubblery/blog/blob/12e3310f173fc2ae7689dfea68ae69464908ea25/_posts/2018-10-22-Node.js-Project-Online.md

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
```


## License: unknown
https://github.com/paulguerrero/paulguerrero.github.io/blob/dad8504f1280a4b4d493f767c5328438e6e928cc/misc/nginx.conf

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60
```


## License: Apache-2.0
https://github.com/mobiledgex/edge-cloud-infra/blob/a4b8cf11b76a8f355b9a59106db23c476c2332e9/ansible/templates/mexplat/console-nginx-config.j2

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_buffering off;
        proxy_hide_header X-Frame-Options;
```


## License: MIT
https://github.com/Vbubblery/blog/blob/12e3310f173fc2ae7689dfea68ae69464908ea25/_posts/2018-10-22-Node.js-Project-Online.md

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
```


## License: unknown
https://github.com/paulguerrero/paulguerrero.github.io/blob/dad8504f1280a4b4d493f767c5328438e6e928cc/misc/nginx.conf

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60
```


## License: Apache-2.0
https://github.com/mobiledgex/edge-cloud-infra/blob/a4b8cf11b76a8f355b9a59106db23c476c2332e9/ansible/templates/mexplat/console-nginx-config.j2

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_buffering off;
        proxy_hide_header X-Frame-Options;
```


## License: MIT
https://github.com/Vbubblery/blog/blob/12e3310f173fc2ae7689dfea68ae69464908ea25/_posts/2018-10-22-Node.js-Project-Online.md

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
```


## License: unknown
https://github.com/paulguerrero/paulguerrero.github.io/blob/dad8504f1280a4b4d493f767c5328438e6e928cc/misc/nginx.conf

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60
```


## License: Apache-2.0
https://github.com/mobiledgex/edge-cloud-infra/blob/a4b8cf11b76a8f355b9a59106db23c476c2332e9/ansible/templates/mexplat/console-nginx-config.j2

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_buffering off;
        proxy_hide_header X-Frame-Options;
```


## License: MIT
https://github.com/Vbubblery/blog/blob/12e3310f173fc2ae7689dfea68ae69464908ea25/_posts/2018-10-22-Node.js-Project-Online.md

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
```


## License: unknown
https://github.com/paulguerrero/paulguerrero.github.io/blob/dad8504f1280a4b4d493f767c5328438e6e928cc/misc/nginx.conf

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60
```


## License: Apache-2.0
https://github.com/mobiledgex/edge-cloud-infra/blob/a4b8cf11b76a8f355b9a59106db23c476c2332e9/ansible/templates/mexplat/console-nginx-config.j2

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_buffering off;
        proxy_hide_header X-Frame-Options;
```


## License: MIT
https://github.com/Vbubblery/blog/blob/12e3310f173fc2ae7689dfea68ae69464908ea25/_posts/2018-10-22-Node.js-Project-Online.md

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
```


## License: unknown
https://github.com/paulguerrero/paulguerrero.github.io/blob/dad8504f1280a4b4d493f767c5328438e6e928cc/misc/nginx.conf

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60
```


## License: Apache-2.0
https://github.com/mobiledgex/edge-cloud-infra/blob/a4b8cf11b76a8f355b9a59106db23c476c2332e9/ansible/templates/mexplat/console-nginx-config.j2

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_buffering off;
        proxy_hide_header X-Frame-Options;
```


## License: MIT
https://github.com/Vbubblery/blog/blob/12e3310f173fc2ae7689dfea68ae69464908ea25/_posts/2018-10-22-Node.js-Project-Online.md

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
```


## License: unknown
https://github.com/paulguerrero/paulguerrero.github.io/blob/dad8504f1280a4b4d493f767c5328438e6e928cc/misc/nginx.conf

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60
```


## License: Apache-2.0
https://github.com/mobiledgex/edge-cloud-infra/blob/a4b8cf11b76a8f355b9a59106db23c476c2332e9/ansible/templates/mexplat/console-nginx-config.j2

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_buffering off;
        proxy_hide_header X-Frame-Options;
```


## License: unknown
https://github.com/paulguerrero/paulguerrero.github.io/blob/dad8504f1280a4b4d493f767c5328438e6e928cc/misc/nginx.conf

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60
```


## License: MIT
https://github.com/Vbubblery/blog/blob/12e3310f173fc2ae7689dfea68ae69464908ea25/_posts/2018-10-22-Node.js-Project-Online.md

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60
```


## License: Apache-2.0
https://github.com/mobiledgex/edge-cloud-infra/blob/a4b8cf11b76a8f355b9a59106db23c476c2332e9/ansible/templates/mexplat/console-nginx-config.j2

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_buffering off;
        proxy_hide_header X-Frame-Options;
```


## License: unknown
https://github.com/paulguerrero/paulguerrero.github.io/blob/dad8504f1280a4b4d493f767c5328438e6e928cc/misc/nginx.conf

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60
```


## License: MIT
https://github.com/Vbubblery/blog/blob/12e3310f173fc2ae7689dfea68ae69464908ea25/_posts/2018-10-22-Node.js-Project-Online.md

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60
```


## License: Apache-2.0
https://github.com/mobiledgex/edge-cloud-infra/blob/a4b8cf11b76a8f355b9a59106db23c476c2332e9/ansible/templates/mexplat/console-nginx-config.j2

```
**Usitumie config hiyo** — ina matatizo mawili makubwa:

1. `X-Frame-Options "SAMEORIGIN"` → **itablock Pi Browser** (ERR_BLOCKED_BY_RESPONSE)
2. PHP-FPM block → **App yako si PHP**, ni Next.js — itafail

Tumia config hii sahihi badala yake:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name omendapipaysglobel.online www.omendapipaysglobel.online;

    ssl_certificate /etc/letsencrypt/live/omendapipaysglobel.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omendapipaysglobel.online/privkey.pem;

    # NO X-Frame-Options — Pi Browser WebView blocks it
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "frame-ancestors 'self' https://*.minepi.com https://minepi.com" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location = /validation-key.txt {
        root /var/www/omendapipays;
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        try_files /validation-key.txt =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_buffering off;
        proxy_hide_header X-Frame-Options;
```

