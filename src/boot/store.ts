import { boot } from 'quasar/wrappers'
import { key } from 'src/services/store'

export default boot(({ app, store }) => {
  app.provide(key, store)
})
