import { boot } from 'quasar/wrappers'
import { Model } from 'vue-api-query'
import { api } from './axios'

export default boot(() => {
  Model.$http = api
})
