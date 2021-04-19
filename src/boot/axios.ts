import axios, { AxiosError } from 'axios'
import { boot } from 'quasar/wrappers'
import { StoreState } from 'src/interfaces/store'
import { Store } from 'vuex'

const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true
})

function getAuthToken (store: Store<StoreState>): string | null {
  return store.state.session.token
}

export default boot(({ app, store, urlPath }) => {
  const token = getAuthToken(store) || ''

  api.interceptors.request.use((config) => {
    config.headers = {
      Authorization: `Bearer ${token}`,
      'X-Requested-With': 'XMLHttpRequest'
    }

    return config
  }, (error: AxiosError) => {
    return Promise.reject(error)
  })

  api.interceptors.response.use((response) => {
    return response
  }, (error: AxiosError) => {
    // API rate limiting
    if (error?.response?.status === 429 && !urlPath.startsWith('/429')) {
      return Promise.reject({ url: '/429' })
    }

    return Promise.reject(error)
  })

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api, axios }
