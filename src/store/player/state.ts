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
    props: null
  }
}

export default state
