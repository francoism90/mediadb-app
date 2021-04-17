import { Media } from 'src/interfaces/media'
import { StreamInfo } from 'src/interfaces/player'
import { Model } from 'src/interfaces/repository'
import { PlayerState } from 'src/interfaces/store'

function state (): PlayerState {
  return {
    controls: false,
    fullscreen: false,
    media: <Media>{},
    model: <Model>{},
    playbackRate: 1.0,
    requestTime: null,
    stream: <StreamInfo>{},
    tracks: []
  }
}

export default state
