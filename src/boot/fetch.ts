import { boot } from 'quasar/wrappers';
import { api } from 'src/services/api';

export default boot(({ app }) => {
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$fetch = api;
});
