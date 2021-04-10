import { MutationTree } from 'vuex'
import { RepositoryState } from 'src/interfaces/store'
import defaultState from './state'
import { Model, RepositoryMeta } from 'src/interfaces/repository'

const mutation: MutationTree<RepositoryState> = {
  resetStore (state: RepositoryState) {
    Object.assign(state, defaultState())
  },

  resetData (state: RepositoryState) {
    state.data = null
  },

  resetMeta (state: RepositoryState) {
    state.meta = null
  },

  resetOptions (state: RepositoryState) {
    state.options = null
  },

  setId (state: RepositoryState, payload: number | string | null) {
    state.id = payload
  },

  setData (state: RepositoryState, payload: Model[] | null) {
    state.data = payload
  },

  setMeta (state: RepositoryState, payload: RepositoryMeta | null) {
    state.meta = payload
  }
}

export default mutation
