import { MutationTree } from 'vuex'
import { PaginateState } from 'src/interfaces/store'
import defaultState from './state'

const mutation: MutationTree<PaginateState> = {
  resetStore (state: PaginateState) {
    Object.assign(state, defaultState())
  }
}

export default mutation
