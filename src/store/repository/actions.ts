import { RepositoryProps, RepositoryResponse } from 'src/interfaces/repository'
import { RepositoryOption, RepositoryState, StoreState } from 'src/interfaces/store'
import { ActionTree } from 'vuex'

const actions: ActionTree<RepositoryState, StoreState> = {
  resetStore (context): void {
    context.commit('resetStore')
  },

  initialize (context, payload: RepositoryProps): void {
    if (payload.id && context.state.id !== payload.id) {
      context.commit('resetStore')
      context.commit('setId', payload.id || null)
      context.commit('setAutoload', payload.autoload || true)
      context.commit('setOptions', payload.options || [])
    }
  },

  setResponse (context, payload: RepositoryResponse): void {
    context.commit('setData', payload.data)
    context.commit('setMeta', payload.meta)
    context.commit('setTimestamp', Date.now())
  },

  setOption (context, payload: RepositoryOption): void {
    // Clear current results
    context.commit('resetData')
    context.commit('resetMeta')

    // Set option
    context.commit('setOptions', payload)

    // Reset id
    context.commit('setId', +new Date())
  }
}

export default actions
