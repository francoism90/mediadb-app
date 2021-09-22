import { boot } from 'quasar/wrappers';
import { intl, intlKey } from 'src/services/intl';

export default boot(({ app }) => {
  app.provide(intlKey, intl);

  app.config.globalProperties.$intl = intl;
});

export { intl };
