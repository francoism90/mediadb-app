import { MutationTree } from 'vuex'
import { SessionState } from 'src/interfaces/store'
import defaultState from './state'
import { UserModel } from 'src/interfaces/model'

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

  setUser (state: SessionState, payload: UserModel) {
    state.user = Object.assign(state.user, payload)
  }
}

export default mutation
