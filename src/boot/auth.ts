import { boot } from 'quasar/wrappers'
import { loggedIn } from 'src/services/auth'

export default boot(({ router, store }) => {
  router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta?.auth)) {
      const isAuthenticated = await loggedIn(store)

      if (!isAuthenticated) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })
})
