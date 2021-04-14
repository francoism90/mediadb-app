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

  setName (state: RepositoryState, payload: string) {
    state.name = payload
  },

  setAutoload (state: RepositoryState, payload: boolean) {
    state.autoload = payload
  },

  setData (state: RepositoryState, payload: Model[]) {
    state.data = state.data.concat(payload)
  },

  setMeta (state: RepositoryState, payload: RepositoryMeta) {
    state.meta = payload
  },

  setOptions (state: RepositoryState, payload: RepositoryOption[]) {
    const currentOptions = state.options
    const finalOptions = { ...currentOptions, ...payload }

    state.options = Object.assign({}, state.options, finalOptions)
  },

  setUpdatedAt (state: RepositoryState, payload: Date) {
    state.updatedAt = payload
  }
}

export default mutation
