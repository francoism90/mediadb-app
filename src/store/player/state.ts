import { Media } from 'src/interfaces/media';
import { PlayerProperties } from 'src/interfaces/player';
import { Model } from 'src/interfaces/repository';
import { PlayerState } from 'src/interfaces/store';

function state(): PlayerState {
  return {
    media: <Media>{},
    model: <Model>{},
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
