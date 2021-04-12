import { PlayerProps } from '@vime/vue-next'
import { PlayerState } from 'src/interfaces/store'
import defaultState from 'src/store/player/state'
import { MutationTree } from 'vuex'

const mutation: MutationTree<PlayerState> = {
  resetStore (state: PlayerState) {
    Object.assign(state, defaultState())
  },

  setProps (state: PlayerState, payload: PlayerProps) {
    Object.assign(state.props, payload)
    console.log('set')
    // state.props = payload
    // console.log(state.props)
    // console.log(payload)
  }
}

export default mutation
