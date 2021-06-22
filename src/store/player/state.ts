import { PlayerProperties, PlayerState } from 'src/interfaces/player';

function state(): PlayerState {
  return {
    ready: false,
    id: null,
    properties: <PlayerProperties>{
      buffered: null,
      controls: false,
      currentSrc: '',
      currentTime: 0,
      requestTime: 0,
      duration: 0,
      ended: false,
      error: null,
      fullscreen: false,
      muted: false,
      networkState: 0,
      paused: true,
      playbackRate: 1.0,
      played: null,
      readyState: 0,
      seekable: null,
      seeking: false,
      textTracks: null,
      volume: 1,
    },
  };
}

export default state;
