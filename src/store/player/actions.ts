// import { PlayerProps } from 'src/interfaces/player'
import { PlayerState, StoreState } from 'src/interfaces/store'
import { ActionTree } from 'vuex'

const actions: ActionTree<PlayerState, StoreState> = {
  resetStore (context): void {
    context.commit('resetStore')
  }

  // initialize (context, payload: PlayerProps): void {
  //   // if (!context.state.ready) {
  //   //   context.commit('setId', Date.now())
  //   //   context.commit('setParams', payload.params)
  //   //   context.commit('setReady', true)
  //   // }
  // }
}

export default actions
