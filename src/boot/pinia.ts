import { PiniaDebounce } from '@pinia/plugin-debounce';
import { debounce } from 'lodash';
import { createPinia } from 'pinia';
import { boot } from 'quasar/wrappers';

const pinia = createPinia();

pinia.use(PiniaDebounce(debounce));

export default boot(({ app }) => {
  app.use(pinia);
});

export { pinia };
