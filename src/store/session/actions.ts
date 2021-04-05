import { ActionTree } from 'vuex'
import { StoreState, SessionState } from 'src/interfaces/store'
import { UserResponse } from 'src/interfaces/response'
import { User } from 'src/interfaces/user'

const actions: ActionTree<SessionState, StoreState> = {
  reset (context): void {
    context.commit('resetStore')
    context.commit('setTimestamp', Date.now())
  },

  setUser (context, payload: UserResponse): void {
    // const obj: Record<User> = JSON.parse(String(payload.user))

    console.log(payload.user)

    context.commit('setToken', payload.token || '')
    context.commit('setUser', payload.user || <User>{})
    context.commit('setTimestamp', Date.now())
  }
}

export default actions
