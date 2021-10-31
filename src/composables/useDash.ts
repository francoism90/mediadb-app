import { useQuasar } from 'quasar';
import { DashProperties, PlayerRequest } from 'src/interfaces';
import { create, destroy } from 'src/services/dash';
import { nextTick, reactive, ref, toRefs } from 'vue';

const state = reactive(<DashProperties>{});
const container = ref<HTMLDivElement>();
const video = ref<HTMLVideoElement>();

export const useDash = () => {
  const $q = useQuasar();
  const reset = (): void => destroy(state.player);

  const initialize = async (source: string, token: string): Promise<void> => {
    reset();

    // Wait for reset
    await nextTick();

    // Initialize player
    state.player = create(source, token, video.value);
  };

  const update = async (request: PlayerRequest): Promise<void> => {
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
    state: toRefs(state),
    container,
    video,
    initialize,
    update,
    reset,
  };
};
