import { RepositoryParameter, RepositoryProps, RepositoryResponse } from 'src/interfaces/repository'
import { RepositoryState, StoreState } from 'src/interfaces/store'
import { ActionTree } from 'vuex'

const actions: ActionTree<RepositoryState, StoreState> = {
  resetStore (context): void {
    context.commit('resetStore')
  },

  initialize (context, payload: RepositoryProps): void {
    if (!context.state.ready) {
      context.commit('resetStore')
      context.commit('setParams', payload.params || [])
    }
  },

  resetModels (context): void {
    context.commit('resetData')
    context.commit('resetMeta')
  },

  setParams (context, payload: RepositoryParameter[]): void {
    context.commit('setParams', payload)
    context.commit('setId', Date.now())
  },

  setResponse (context, payload: RepositoryResponse): void {
    context.commit('setData', payload.data)
    context.commit('setMeta', payload.meta)
  }
}

export default actions
