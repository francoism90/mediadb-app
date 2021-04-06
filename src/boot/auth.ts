import { boot } from 'quasar/wrappers'
import { getUser } from 'src/services/auth'
import { Store } from 'vuex'
import { StoreState } from 'src/interfaces/store'

async function checkUser (store: Store<StoreState>, redirectPath: string | null): Promise<boolean> {
  try {
    // Validate current token
    const sessionToken = store.state.session.token

    if (!sessionToken || sessionToken.length === 0) {
      throw Error('Invalid auth-token given')
    }

    // Returns 401 when token is invalid
    const response = await getUser()

    await store.dispatch('session/setUser', response)

    return true
  } catch {
    await store.dispatch('session/reset')

    // Redirect after successful login
    store.commit('session/setRedirectPath', redirectPath)

    return false
  }
}

export default boot(({ router, store }) => {
  router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta?.auth)) {
      const isAuthenticated = await checkUser(store, to.fullPath)

      if (!isAuthenticated) {
        next({ path: '/login' })
      } else {
        next()
      }
    } else {
      next()
    }
  })
})
