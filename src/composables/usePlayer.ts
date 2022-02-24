import { MediaPlayerClass } from 'dashjs';
import { debounce } from 'lodash';
import { PlayerFrame, PlayerState } from 'src/interfaces';
import { getToken } from 'src/services/auth';
import { addListeners, create, destroy } from 'src/services/player';
import { nextTick, ref } from 'vue';

const player = ref<MediaPlayerClass>();
const state = ref<PlayerState>();
const frame = ref<PlayerFrame>();

const container = ref<HTMLDivElement>();
const video = ref<HTMLVideoElement>();

export const usePlayer = () => {
  const handler = () => {
    // We need to fill the state ourselves
    state.value = <PlayerState>{
      ready: player.value?.isReady(),
      autoplay: player.value?.getAutoPlay(),
      buffered: player.value?.getBufferLength('video'),
      duration: player.value?.duration(),
      muted: player.value?.isMuted(),
      paused: player.value?.isPaused(),
      playbackRate: player.value?.getPlaybackRate(),
      seeking: player.value?.isSeeking(),
      source: player.value?.getSource(),
      tracks: player.value?.getVideoElement()?.textTracks,
      textTrack: player.value?.getCurrentTrackFor('text'),
      textTracks: player.value?.getTracksFor('text'),
      videoTrack: player.value?.getCurrentTrackFor('video'),
      videoTracks: player.value?.getTracksFor('video'),
      time: player.value?.time(),
      volume: player.value?.getVolume(),
    };
  };

  const initialize = async (source: string | undefined, element: HTMLElement | undefined) => {
    destroy(player.value);

    // Wait for reset
    await nextTick();

    // Get token
    const token = <string>getToken();

    // Initialize player
    player.value = create(source || '', token, element);

    addListeners(player.value, debounce(handler, 100));
  };

  const setFrame = (payload: PlayerFrame) => {
    frame.value = payload;
  };

  return {
    player,
    state,
    container,
    video,
    initialize,
    destroy,
    setFrame,
  };
};
