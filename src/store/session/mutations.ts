import { MutationTree } from 'vuex'
import { Profile } from 'src/interfaces/session'
import { SessionState } from 'src/interfaces/store'
import defaultState from './state'

const mutation: MutationTree<SessionState> = {
  resetStore (state: SessionState) {
    Object.assign(state, defaultState())
  },

  setToken (state: SessionState, payload: string) {
    state.token = payload
  },

  setTimestamp (state: SessionState, payload: Date) {
    state.timestamp = payload
  },

  setUser (state: SessionState, payload: Profile) {
    Object.assign(state.user, payload)
  }
}

export default mutation
