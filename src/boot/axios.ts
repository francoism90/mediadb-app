import { boot } from 'quasar/wrappers'
import axios, { AxiosError } from 'axios'
import { getAuthToken } from 'src/services/auth'

const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true
})

export default boot(({ app, store, urlPath }) => {
  const token = getAuthToken(store) || ''

  api.interceptors.request.use((config) => {
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    }

    return config
  }, (error: AxiosError) => {
    return Promise.reject(error)
  })

  api.interceptors.response.use((response) => {
    return response
  }, (error: AxiosError) => {
    // Upstream rate limiting
    if (error?.response?.status === 429 && !urlPath.startsWith('/429')) {
      return Promise.reject({ url: '/429' })
    }

    return Promise.reject(error)
  })

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { axios, api }
