import { MediaPlayerClass } from 'dashjs';
import { useQuasar } from 'quasar';
import { PlayerRequest } from 'src/interfaces';
import { create, destroy, getVideoResolution } from 'src/services/dash';
import { computed, nextTick, ref } from 'vue';

export const useDash = () => {
  const $q = useQuasar();

  const player = ref<MediaPlayerClass | undefined>();
  const container = ref<HTMLDivElement>();
  const video = ref<HTMLVideoElement>();

  const resolution = computed(() => getVideoResolution());

  const reset = () => destroy(player.value);

  const initialize = async (source: string, token: string) => {
    reset();

    // Wait for reset
    await nextTick();

    // Initialize player
    player.value = create(source, token, video.value);
  };

  const update = async (request: PlayerRequest) => {
    // Screen
    if (request.fullscreen) await $q.fullscreen.toggle(container.value);
    if (request.fullscreen || request.resolution) player.value?.updatePortalSize();

    // Playback
    if (request.pause && player.value?.isPaused()) player.value?.play();
    else if (request.pause && !player.value?.isPaused()) player.value?.pause();

    // Seeking
    if (request.seek) player.value?.seek(request.seek);
  };

  return {
    player,
    container,
    video,
    resolution,
    initialize,
    update,
    reset,
  };
};
