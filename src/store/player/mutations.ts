import { Media } from 'src/interfaces/media'
import { Model } from 'src/interfaces/repository'
import { PlayerState } from 'src/interfaces/store'
import defaultState from 'src/store/player/state'
import { MutationTree } from 'vuex'

const mutation: MutationTree<PlayerState> = {
  resetStore (state: PlayerState) {
    Object.assign(state, defaultState())
  },

  setMedia (state: PlayerState, payload: Media) {
    state.media = Object.assign(state.media, payload)
  },

  setModel (state: PlayerState, payload: Model) {
    state.model = Object.assign(state.model, payload)
  }
}

export default mutation
