import { AuthResponse } from 'src/interfaces/session'
import { SessionState, StoreState } from 'src/interfaces/store'
import { User, UserResponse } from 'src/interfaces/user'
import { ActionTree } from 'vuex'

const actions: ActionTree<SessionState, StoreState> = {
  reset (context): void {
    context.commit('resetStore')
    context.commit('setTimestamp', Date.now())
  },

  setToken (context, payload: AuthResponse): void {
    context.commit('setToken', payload.token || '')
    context.commit('setTimestamp', Date.now())
  },

  setUser (context, payload: UserResponse): void {
    context.commit('setRedirectPath', null)
    context.commit('setUser', payload.data || <User>{})
    context.commit('setTimestamp', Date.now())
  }
}

export default actions
