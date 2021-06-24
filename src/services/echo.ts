import Echo from 'laravel-echo';
import { PusherChannel } from 'laravel-echo/dist/channel';
import { api } from 'src/boot/axios';
import { useSessionStore } from 'src/store/session';
import { InjectionKey } from 'vue';

export const store = useSessionStore();

export const echoKey: InjectionKey<Echo> = Symbol('echo');

export function initialize(): Echo {
  const authToken = store.token || '';

  return new Echo({
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
    auth: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    authorizer: (channel: PusherChannel) => ({
      // eslint-disable-next-line @typescript-eslint/ban-types
      authorize: async (socketId: string, callback: Function) => {
        try {
          const response = await api.post('/broadcasting/auth', {
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
}
