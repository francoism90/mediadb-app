import { StreamInfo } from 'src/interfaces/player'
import { Model } from 'src/interfaces/repository'
import { PlayerState } from 'src/interfaces/store'

function state (): PlayerState {
  return {
    controls: false,
    fullscreen: false,
    playbackRate: 1.0,
    tracks: [],
    requestTime: null,
    stream: <StreamInfo>{},
    model: <Model>{}
  }
}

export default state
