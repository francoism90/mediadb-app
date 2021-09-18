# MediaDB app

**MediaDB** is a web-based video streaming service written in Laravel, TypeScript and Vue 3 ([Quasar](https://quasar.dev/)).

Note: MediaDB is still under development. It is recommended to create a fork and sync it with the `main` branch.

## Documentation

<https://francoism90.github.io/mediadb-docs/>

Please consult the following links to learn more about Quasar:

- <https://quasar.dev>
- <https://quasar.dev/quasar-cli/installation>

### Configuration

```bash
cd /var/www/html/app
cp .env.example .env
yarn install
```

### Build project (PWA/SPA)

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

- <https://quasar.dev/quasar-cli/developing-capacitor-apps/introduction>
- <https://capacitorjs.com/>

```bash
quasar dev --mode capacitor --target android --ide
```

### Build Android project

```bash
quasar build --mode capacitor --target android --ide
```

Update `src-capacitor/android/app/src/main/res/xml/network_security_config.xml` and `src-capacitor/capacitor.config.json` with your own configured domains.
