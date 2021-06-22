import { boot } from 'quasar/wrappers';
import VueClickAway from 'vue3-click-away';

export default boot(({ app }) => {
  app.use(VueClickAway);
});

export { VueClickAway };
