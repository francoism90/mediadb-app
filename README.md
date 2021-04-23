# MediaDB app

**MediaDB** is a web-based video streaming service written in Laravel and Vue ([Quasar](https://quasar.dev/)).

MediaDB is very much in development and may not be suitable for production purposes.

## Installation

Notes:

- Requires a running [MediaDB API](https://github.com/francoism90/mediadb) instance.
- It is recommend to clone/install MediaDB projects to `/var/www/html/api` (mediadb-api) and `/var/www/html/app` (SPA/PWA).
- See our [api docs](https://github.com/francoism90/mediadb/blob/master/doc/nginx/) for nginx configuration examples.

### Configuration

Please consult to following links to learn more about Quasar:

- <https://next.quasar.dev>
- <https://next.quasar.dev/quasar-cli/commands-list#introduction>
- <https://next.quasar.dev/quasar-cli/developing-capacitor-apps/introduction#introduction>

### Build project (SPA/PWA)

```bash
cd /var/www/html/app
cp .env.example .env
npm install
quasar build
```

### Live project

```bash
cd /var/www/html/app
cp .env.local.example .env.local
npm install
quasar dev
```

### Live Android project

Notes:

- [Android Studio](https://next.quasar.dev/quasar-cli/developing-capacitor-apps/preparation) is required.
- Update `src-capacitor/android/app/src/main/res/xml/network_security_config.xml` and `src-capacitor/capacitor.config.json` so it reflects your own configured domains.

```bash
cd /var/www/html/app
cp .env.example .env
npm install
quasar dev --mode capacitor --target android --ide
```

### Build Android project

Notes:

- [Android Studio](https://next.quasar.dev/quasar-cli/developing-capacitor-apps/preparation) is required.
- Update `src-capacitor/android/app/src/main/res/xml/network_security_config.xml` and `src-capacitor/capacitor.config.json` so it reflects your own configured domains.

```bash
cd /var/www/html/app
cp .env.example .env
npm install
quasar build --mode capacitor --target android --ide
```
