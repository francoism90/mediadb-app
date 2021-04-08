import { ActionTree } from 'vuex'
import { StoreState, RepositoryState, RepositoryOption } from 'src/interfaces/store'
import { RepositoryResponse } from 'src/interfaces/repository'

const actions: ActionTree<RepositoryState, StoreState> = {
  reset (context): void {
    context.commit('resetStore')
  },

  setResponse (context, payload: RepositoryResponse): void {
    console.log('action: ', payload.data)
    context.commit('setData', payload.data)
    context.commit('setMeta', payload.meta)
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
