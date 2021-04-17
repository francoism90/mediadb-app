import { Media } from 'src/interfaces/media'
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
    media: <Media>{},
    model: <Model>{},
    stream: <StreamInfo>{}
  }
}

export default state
