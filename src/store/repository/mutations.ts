import { Model, RepositoryMeta } from 'src/interfaces/repository'
import { RepositoryOption, RepositoryState } from 'src/interfaces/store'
import defaultState from 'src/store/repository/state'
import { MutationTree } from 'vuex'

const mutation: MutationTree<RepositoryState> = {
  resetStore (state: RepositoryState) {
    Object.assign(state, defaultState())
  },

  resetData (state: RepositoryState) {
    state.data = <Model[]>[]
  },

  resetMeta (state: RepositoryState) {
    state.meta = <RepositoryMeta>{}
  },

  resetOptions (state: RepositoryState) {
    state.options = <RepositoryOption[]>[]
  },

  setId (state: RepositoryState, payload: number | string | null) {
    state.id = payload
  },

  setData (state: RepositoryState, payload: Model[]) {
    state.data = state.data.concat(payload)
  },

  setMeta (state: RepositoryState, payload: RepositoryMeta) {
    state.meta = payload
  }
}

export default mutation
