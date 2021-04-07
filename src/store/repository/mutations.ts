import { MutationTree } from 'vuex'
import { RepositoryState } from 'src/interfaces/store'
import defaultState from './state'

const mutation: MutationTree<RepositoryState> = {
  resetStore (state: RepositoryState) {
    Object.assign(state, defaultState())
  }
}

export default mutation
