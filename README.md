# MediaDB app

**MediaDB** is a web-based video streaming service written in Laravel, TypeScript and Vue 3 ([Quasar](https://next.quasar.dev/)).

MediaDB is very much in development and may not be suitable for production purposes.
It is recommended to fork the project.

## Installation

Notes:

- Requires a running [MediaDB API](https://github.com/francoism90/mediadb) instance.
- See the [api docs](https://github.com/francoism90/mediadb/blob/master/doc/nginx/) for nginx configuration examples.

```bash
cd /var/www/html/app
cp .env.example .env
yarn install
```

### Configuration

Please consult the following links to learn more about Quasar:

- <https://next.quasar.dev>
- <https://next.quasar.dev/quasar-cli/installation>

When using Capacitor, update `src-capacitor/android/app/src/main/res/xml/network_security_config.xml` and `src-capacitor/capacitor.config.json` so it reflects your own configured domains.

### Build project (SPA/PWA)

```bash
quasar build -m pwa
quasar build -m spa
```

### Live project

```bash
quasar dev -m pwa
quasar dev -m spa
```

### Live Android project

Please consult the following links to learn more about Capacitor:

- <https://next.quasar.dev/quasar-cli/developing-capacitor-apps/introduction>
- <https://capacitorjs.com/>

```bash
quasar dev --mode capacitor --target android --ide
```

### Build Android project

```bash
quasar build --mode capacitor --target android --ide
```
