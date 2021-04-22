import { AuthResponse } from 'src/interfaces/session'
import { SessionState, StoreState } from 'src/interfaces/store'
import { User } from 'src/interfaces/user'
import { ActionTree } from 'vuex'

const actions: ActionTree<SessionState, StoreState> = {
  resetStore (context): void {
    context.commit('resetStore')
    context.commit('setTimestamp', Date.now())
  },

  resetUser (context): void {
    context.commit('setToken', '')
    context.commit('setUser', <User>{})
    context.commit('setTimestamp', Date.now())
  },

  initialize (context, payload: AuthResponse): void {
    context.commit('setToken', payload.token || '')
    context.commit('setUser', payload.user || <User>{})
    context.commit('setTimestamp', Date.now())
  },

  setUser (context, payload: AuthResponse): void {
    context.commit('setUser', payload.user || <User>{})
    context.commit('setTimestamp', Date.now())
  }
}

export default actions
