import Echo from 'laravel-echo';
import { PusherChannel } from 'laravel-echo/dist/channel';
import { api } from 'src/boot/axios';
import { InjectionKey } from 'vue';

export const echoKey: InjectionKey<Echo> = Symbol('echo-key');

export const initialize = (): Echo => new Echo({
  broadcaster: 'pusher',
  key: process.env.WS_KEY,
  cluster: process.env.WS_CLUSTER,
  wsHost: process.env.WS_HOST,
  wsPort: process.env.WS_PORT,
  wssPort: process.env.WS_PORT,
  disableStats: true,
  forceTLS: process.env.WS_TLS,
  enabledTransports: ['ws', 'wss'],
  authEndpoint: `${process.env.API_URL}/broadcasting/auth`,
  authorizer: (channel: PusherChannel) => ({
    // eslint-disable-next-line @typescript-eslint/ban-types
    authorize: async (socketId: string, callback: Function) => {
      try {
        const response = await api.post('broadcasting/auth', {
          socket_id: socketId,
          channel_name: channel.name as string,
        });

        callback(false, response.data);
      } catch (error) {
        callback(true, error);
      }
    },
  }),
});
