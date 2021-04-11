import { MutationTree } from 'vuex'
import { PlayerState } from 'src/interfaces/store'
import defaultState from './state'

const mutation: MutationTree<PlayerState> = {
  resetStore (state: PlayerState) {
    Object.assign(state, defaultState())
  }
}

export default mutation
