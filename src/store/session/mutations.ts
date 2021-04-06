import { MutationTree } from 'vuex'
import { SessionState } from 'src/interfaces/store'
import defaultState from './state'
import { User } from 'src/interfaces/user'

const mutation: MutationTree<SessionState> = {
  resetStore (state: SessionState) {
    Object.assign(state, defaultState())
  },

  setRedirectPath (state: SessionState, payload: string | null) {
    state.redirectPath = payload

    console.log(`state: ${state.redirectPath || ''}`)
    // console.log(state)
  },

  setToken (state: SessionState, payload: string) {
    state.token = payload
  },

  setTimestamp (state: SessionState, payload: Date) {
    state.timestamp = payload
  },

  setUser (state: SessionState, payload: User) {
    Object.assign(state.user, payload)
  }
}

export default mutation
