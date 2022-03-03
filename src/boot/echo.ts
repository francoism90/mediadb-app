import Echo from 'laravel-echo';
import { PusherChannel } from 'laravel-echo/dist/channel';
import Pusher from 'pusher-js';
import { boot } from 'quasar/wrappers';
import { api } from 'src/services/api';
import { InjectionKey } from 'vue';

export const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.WS_KEY,
  cluster: process.env.WS_CLUSTER,
  wsHost: process.env.WS_HOST,
  wsPort: process.env.WS_PORT,
  wssPort: process.env.WS_PORT,
  forceTLS: true,
  encrypted: true,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  authEndpoint: `${process.env.API_URL}/broadcasting/auth`,
  authorizer: (channel: PusherChannel) => ({
    // eslint-disable-next-line @typescript-eslint/ban-types
    authorize: async (socketId: string, callback: Function) => {
      const { error, data } = await api('broadcasting/auth').post({
        socket_id: socketId,
        channel_name: channel.name as string,
      }).json();

      callback(!!error.value, data.value);
    },
  }),
});

export const echoKey: InjectionKey<Echo> = Symbol('echo-key');

export default boot(({ app }) => {
  app.provide(echoKey, echo);

  app.config.globalProperties.$pusher = Pusher;
  app.config.globalProperties.$echo = echo;
});
