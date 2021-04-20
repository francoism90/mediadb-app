import { PlayerState, StoreState } from 'src/interfaces/store'
import { GetterTree } from 'vuex'

const getters: GetterTree<PlayerState, StoreState> = {
  isLoading (state: PlayerState): boolean {
    if (!state.media || !state.stream) {
      return true
    }

    const readyState = state.stream.readyState || 0
    const ended = state.stream.ended || false

    return (!ended && readyState < 3)
  }
}

export default getters
