import { ActionTree } from 'vuex'
import { StoreState, SessionState } from 'src/interfaces/store'
import { Profile } from 'src/interfaces/session'

const actions: ActionTree<SessionState, StoreState> = {
  reset (context): void {
    context.commit('resetStore')
    context.commit('setTimestamp', Date.now())
  },

  setUser (context, payload: { user: Profile }): void {
    context.commit('setUser', payload.user)
    context.commit('setTimestamp', Date.now())
  }
}

export default actions
