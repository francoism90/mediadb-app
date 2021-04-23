import { Media } from 'src/interfaces/media'
import { PlayerRequest, StreamInfo } from 'src/interfaces/player'
import { Model } from 'src/interfaces/repository'
import { PlayerState } from 'src/interfaces/store'

function state (): PlayerState {
  return {
    media: <Media>{},
    model: <Model>{},
    request: <PlayerRequest>{
      controls: false,
      currentTime: 0,
      fullscreen: false,
      pause: true,
      playbackRate: 1.0,
      tracks: []
    },
    stream: <StreamInfo>{}
  }
}

export default state
