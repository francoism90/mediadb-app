import { PlayerState, StoreState } from 'src/interfaces/store'
import { ActionTree } from 'vuex'

const actions: ActionTree<PlayerState, StoreState> = {
  reset (context): void {
    context.commit('resetStore')
  }
}

export default actions
