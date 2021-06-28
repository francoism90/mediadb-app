import { boot } from 'quasar/wrappers';
import { initialize, echoKey } from 'src/services/echo';
import Pusher from 'pusher-js';

const echo = initialize();

export default boot(({ app }) => {
  app.provide(echoKey, echo);

  app.config.globalProperties.$pusher = Pusher;
  app.config.globalProperties.$echo = echo;
});
