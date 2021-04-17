import { Media } from 'src/interfaces/media'
import { StreamInfo } from 'src/interfaces/player'
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

  setStream (state: PlayerState, payload: StreamInfo) {
    const currentStreamInfo = state.stream
    const finalStreamInfo = { ...currentStreamInfo, ...payload }

    state.stream = Object.assign({}, state.stream, finalStreamInfo)
  },

  setControls (state: PlayerState, payload: boolean) {
    state.controls = payload
  },

  setFullscreen (state: PlayerState, payload: boolean) {
    state.fullscreen = payload
  },

  setPlaybackRate (state: PlayerState, payload: number) {
    state.playbackRate = payload
  },

  setPause (state: PlayerState, payload: boolean) {
    state.pause = payload
  },

  setRequestTime (state: PlayerState, payload: number) {
    state.requestTime = payload
  },

  setTracks (state: PlayerState, payload: Media[]) {
    state.tracks = payload
  }
}

export default mutation
