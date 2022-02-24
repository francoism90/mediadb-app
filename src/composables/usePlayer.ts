import { Event, MediaPlayerClass } from 'dashjs';
import { PlayerState } from 'src/interfaces';
import { getToken } from 'src/services/auth';
import { addListeners, create, destroy } from 'src/services/player';
import { nextTick, reactive, ref } from 'vue';

const player = ref<MediaPlayerClass>();
const state = reactive(<PlayerState>{});

const container = ref<HTMLDivElement>();
const video = ref<HTMLVideoElement>();

export const usePlayer = () => {
  const handler = (event: Event) => {
    // buffer
    if (['buffer', 'can'].some((str) => event.type.startsWith(str))) {
      state.ready = player.value?.isReady();
      state.buffered = player.value?.getBufferLength('video');
    }

    // playback
    if (event.type.startsWith('playback')) {
      state.duration = player.value?.duration();
      state.muted = player.value?.isMuted();
      state.paused = player.value?.isPaused();
      state.playbackRate = player.value?.getPlaybackRate();
      state.seeking = player.value?.isSeeking();
      state.time = player.value?.time();
      state.volume = player.value?.getVolume();
    }

    // track
    if (['stream', 'track', 'text', 'quality'].some((str) => event.type.startsWith(str))) {
      state.tracks = player.value?.getVideoElement()?.textTracks;
      state.textTrack = player.value?.getCurrentTrackFor('text');
      state.textTracks = player.value?.getTracksFor('text');
      state.videoTrack = player.value?.getCurrentTrackFor('video');
      state.videoTracks = player.value?.getTracksFor('video');
    }
  };

  const initialize = async (source: string | undefined, element: HTMLElement | undefined) => {
    destroy(player.value);

    // Wait for reset
    await nextTick();

    // Get token
    const token = <string>getToken();

    // Initialize player
    player.value = create(source || '', token, element);

    addListeners(player.value, handler);
  };

  return {
    initialize,
    destroy,
    player,
    state,
    container,
    video,
  };
};
