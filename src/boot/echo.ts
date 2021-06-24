import Pusher from 'pusher-js';
import { boot } from 'quasar/wrappers';
import { echoKey, initialize } from 'src/services/echo';

export default boot(({ app }) => {
  const echo = initialize();

  app.provide(echoKey, echo);

  app.config.globalProperties.$pusher = Pusher;
  app.config.globalProperties.$echo = echo;
});
