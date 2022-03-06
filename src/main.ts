import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import 'quasar/src/css/index.sass';

import { Quasar } from 'quasar';
import { createApp } from 'vue';

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue';

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {
    AppFullscreen: {},
    Dialog: {},
    LocalStorage: {},
    Meta: {},
    Notify: {},
    SessionStorage: {},
  },
  config: {
    brand: {
      primary: '#e46262',
      // ... or all other brand colors
    },
    // notify: {...}, // default set of options for Notify Quasar plugin
    // loading: {...}, // default set of options for Loading Quasar plugin
    // loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  },
});

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app');
