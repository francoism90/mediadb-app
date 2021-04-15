import { Model, RepositoryMeta, RepositoryParameters } from 'src/interfaces/repository'
import { RepositoryState } from 'src/interfaces/store'
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

  resetParams (state: RepositoryState) {
    state.params = <RepositoryParameters>{}
  },

  setId (state: RepositoryState, payload: string | number | null) {
    state.id = payload
  },

  setData (state: RepositoryState, payload: Model[]) {
    state.data = state.data.concat(payload)
  },

  setMeta (state: RepositoryState, payload: RepositoryMeta) {
    state.meta = payload
  },

  setParams (state: RepositoryState, payload: RepositoryParameters) {
    const currentParams = state.params
    const finalParams = { ...currentParams, ...payload }

    state.params = Object.assign({}, state.params, finalParams)
  },

  setReady (state: RepositoryState, payload: boolean) {
    state.ready = payload
  }
}

export default mutation
