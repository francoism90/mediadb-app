import axios, { AxiosError } from 'axios'
import { boot } from 'quasar/wrappers'

const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

export function setAuthHeader (token: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export default boot(({ app, urlPath }) => {
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
