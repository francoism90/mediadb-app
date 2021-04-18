import { Media } from 'src/interfaces/media'
import { PlayerRequest, StreamInfo } from 'src/interfaces/player'
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
  },

  setRequest (state: PlayerState, payload: PlayerRequest) {
    const currentRequests = state.request
    const finalRequests = { ...currentRequests, ...payload }

    state.request = Object.assign({}, state.request, finalRequests)
  },

  setStream (state: PlayerState, payload: StreamInfo) {
    const currentStreamInfo = state.stream
    const finalStreamInfo = { ...currentStreamInfo, ...payload }

    state.stream = Object.assign({}, state.stream, finalStreamInfo)
  }
}

export default mutation
