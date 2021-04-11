import { PlayerState } from 'src/interfaces/store'

function state (): PlayerState {
  return {
    id: null,
    controls: false,
    fullscreen: false,
    playbackRate: 1.0,
    tracks: null,
    requestTime: null,
    lastSync: 0,
    status: {
      buffered: null,
      currentTime: 0,
      duration: 0,
      paused: true,
      playable: false,
      playing: false,
      waiting: true
    }
  }
}

export default state
