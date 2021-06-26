import { boot } from 'quasar/wrappers';
import { emittery, emitteryKey } from 'src/services/emittery';

export default boot(({ app }) => {
  app.provide(emitteryKey, emittery);

  app.config.globalProperties.$emittery = emittery;
});
