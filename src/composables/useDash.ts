import { useQuasar } from 'quasar';
import { DashProperties, PlayerRequest } from 'src/interfaces';
import { create, destroy, getVideoResolution } from 'src/services/dash';
import { computed, nextTick, reactive, ref } from 'vue';

export const useDash = () => {
  const $q = useQuasar();

  const state = reactive(<DashProperties>{});
  const container = ref<HTMLDivElement>();
  const video = ref<HTMLVideoElement>();

  const resolution = computed(() => getVideoResolution(state.player));

  const reset = () => destroy(state.player);

  const initialize = async (source: string, token: string) => {
    console.log('init', source);
    console.log('init', source);

    reset();

    // Wait for reset
    await nextTick();

    // Initialize player
    state.player = create(source, token, video.value);
  };

  const update = async (request: PlayerRequest) => {
    // Screen
    if (request.fullscreen) await $q.fullscreen.toggle(container.value);
    if (request.fullscreen || request.resolution) state.player?.updatePortalSize();

    // Playback
    if (request.pause && state.player?.isPaused()) state.player?.play();
    else if (request.pause && !state.player?.isPaused()) state.player?.pause();

    // Seeking
    if (request.seek) state.player?.seek(request.seek);
  };

  return {
    state,
    container,
    video,
    resolution,
    initialize,
    update,
    reset,
  };
};
