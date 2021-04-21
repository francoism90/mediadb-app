import { Media } from 'src/interfaces/media'
import { PlayerRequest, StreamInfo } from 'src/interfaces/player'
import { Model } from 'src/interfaces/repository'
import { PlayerState } from 'src/interfaces/store'

function state (): PlayerState {
  return {
    media: <Media>{},
    model: <Model>{},
    request: <PlayerRequest>{
      controls: null,
      currentTime: null,
      fullscreen: null,
      pause: null,
      playbackRate: 1.0,
      tracks: []
    },
    stream: <StreamInfo>{}
  }
}

export default state
