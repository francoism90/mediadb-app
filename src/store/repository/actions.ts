import { RepositoryParameter, RepositoryProps, RepositoryResponse } from 'src/interfaces/repository'
import { RepositoryState, StoreState } from 'src/interfaces/store'
import { ActionTree } from 'vuex'

const actions: ActionTree<RepositoryState, StoreState> = {
  resetStore (context): void {
    context.commit('resetStore')
  },

  initialize (context, payload: RepositoryProps): void {
    if (!context.state.ready) {
      console.log(payload.module, payload.params)
      context.commit('setId', Date.now())
      context.commit('setParams', payload.params || [])
      context.commit('setReady', true)
    }
  },

  resetModels (context): void {
    context.commit('resetData')
    context.commit('resetMeta')
    context.commit('setId', Date.now())
  },

  setParams (context, payload: RepositoryParameter[]): void {
    context.commit('setParams', payload)
  },

  setResponse (context, payload: RepositoryResponse): void {
    context.commit('setData', payload.data)
    context.commit('setMeta', payload.meta)
  }
}

export default actions
