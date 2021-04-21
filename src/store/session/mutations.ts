import { SessionState } from 'src/interfaces/store'
import { User } from 'src/interfaces/user'
import defaultState from 'src/store/session/state'
import { MutationTree } from 'vuex'

const mutation: MutationTree<SessionState> = {
  resetStore (state: SessionState) {
    Object.assign(state, defaultState())
  },

  setRedirectPath (state: SessionState, payload: string | null) {
    state.redirectPath = payload
  },

  setToken (state: SessionState, payload: string) {
    state.token = payload
  },

  setTimestamp (state: SessionState, payload: Date) {
    state.timestamp = payload
  },

  setUser (state: SessionState, payload: User) {
    state.user = Object.assign(state.user, payload)
  }
}

export default mutation
