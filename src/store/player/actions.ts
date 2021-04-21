import { PlayerProps, PlayerRequest } from 'src/interfaces/player'
import { PlayerState, StoreState } from 'src/interfaces/store'
import { ActionTree } from 'vuex'

const actions: ActionTree<PlayerState, StoreState> = {
  resetStore (context): void {
    context.commit('resetStore')
  },

  initialize (context, payload: PlayerProps): void {
    context.commit('setMedia', payload.media)
    context.commit('setModel', payload.model)
  },

  sendRequest (context, payload: PlayerRequest): void {
    context.commit('setRequest', payload)
  }
}

export default actions
