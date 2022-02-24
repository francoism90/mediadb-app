import { Event, MediaPlayerClass } from 'dashjs';
import { PlayerState, PlayerTrack, VideoModel } from 'src/interfaces';
import { getToken } from 'src/services/auth';
import { addListeners, appendTrack, create, destroy, showTextTrack } from 'src/services/player';
import { nextTick, reactive, ref } from 'vue';

const player = ref<MediaPlayerClass>();
const state = reactive(<PlayerState>{});

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

  const initialize = async (model: VideoModel, view: HTMLElement | undefined) => {
    destroy(player.value);

    // Wait for reset
    await nextTick();

    // Get token
    const token = <string>getToken();

    // Initialize player
    player.value = create(model.dash_url || '', token, view);

    addListeners(player.value, handler);

    appendTrack(player.value, <PlayerTrack>{
      id: 'thumbnail',
      kind: 'metadata',
      label: 'thumbnail',
      srclang: 'en',
      src: model.sprite_url,
    });

    showTextTrack(player.value, <TextTrack>{ label: 'thumbnail' });
  };

  return {
    initialize,
    destroy,
    player,
    state,
  };
};
