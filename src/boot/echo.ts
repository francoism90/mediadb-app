import Echo from 'laravel-echo'
import { PusherChannel } from 'laravel-echo/dist/channel'
import Pusher from 'pusher-js'
import { boot } from 'quasar/wrappers'
import { api } from 'src/boot/axios'
import { StoreState } from 'src/interfaces/store'
import { Store } from 'vuex'

function createEcho (store: Store<StoreState>): Echo {
  const authToken = store.state.session.token || ''
  console.log(authToken)

  return new Echo({
    broadcaster: 'pusher',
    key: process.env.WS_KEY,
    cluster: process.env.WS_CLUSTER || 'mt1',
    wsHost: process.env.WS_HOST || 'localhost',
    wsPort: process.env.WS_PORT || 6001,
    wssPort: process.env.WS_PORT || 6001,
    disableStats: true,
    forceTLS: process.env.WS_TLS || false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: process.env.API_URL + '/broadcasting/auth',
    auth: {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    },
    authorizer: (channel: PusherChannel) => {
      return {
        // eslint-disable-next-line @typescript-eslint/ban-types
        authorize: async (socketId: string, callback: Function) => {
          try {
            const response = await api.post('/broadcasting/auth', {
              socket_id: socketId,
              channel_name: channel.name as string
            })

            // eslint-disable-next-line node/no-callback-literal
            callback(false, response.data)
          } catch (error) {
            // eslint-disable-next-line node/no-callback-literal
            callback(true, error)
          }
        }
      }
    }
  })
}

export default boot(({ app, store }) => {
  app.config.globalProperties.$pusher = Pusher
  app.config.globalProperties.$echo = createEcho(store)
})
