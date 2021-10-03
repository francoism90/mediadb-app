import { PiniaDebounce } from '@pinia/plugin-debounce';
import { debounce } from 'lodash';
import { createPinia } from 'pinia';
import { boot } from 'quasar/wrappers';

export const pinia = createPinia();

export default boot(({ app }) => {
  pinia.use(PiniaDebounce(debounce));

  app.use(pinia);
});
