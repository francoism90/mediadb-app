import { RepositoryProps, RepositoryResponse } from 'src/interfaces/repository'
import { RepositoryOption, RepositoryState, StoreState } from 'src/interfaces/store'
import { ActionTree } from 'vuex'

const actions: ActionTree<RepositoryState, StoreState> = {
  resetStore (context): void {
    context.commit('resetStore')
  },

  initialize (context, payload: RepositoryProps): void {
    if (context.state.name !== payload.name) {
      context.commit('resetStore')
      context.commit('setName', payload.name)
      context.commit('setAutoload', payload.autoload || true)
      context.commit('setOptions', payload.options || [])
    }
  },

  setResponse (context, payload: RepositoryResponse): void {
    context.commit('setData', payload.data)
    context.commit('setMeta', payload.meta)
    context.commit('setTimestamp', Date.now())
  },

  setOptions (context, payload: RepositoryOption[]): void {
    context.commit('resetData')
    context.commit('resetMeta')
    context.commit('setOptions', payload)
    context.commit('setId', +new Date())
  }
}

export default actions
