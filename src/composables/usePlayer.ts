import { MediaPlayerClass } from 'dashjs';
import { useQuasar } from 'quasar';
import { timeFormat } from 'src/helpers';
import { PlayerRequest } from 'src/interfaces';
import { create, destroy, getResolution, getThumbnailUrl, store } from 'src/services/player';
import { computed, nextTick, ref } from 'vue';

export const usePlayer = () => {
  const $q = useQuasar();

  const $player = ref<MediaPlayerClass | undefined>();
  const container = ref<HTMLDivElement>();
  const video = ref<HTMLVideoElement>();

  const time = computed(() => timeFormat(store.properties?.time));
  const duration = computed(() => timeFormat(store.properties?.duration));
  const resolution = computed(() => getResolution());

  const reset = () => destroy($player.value);

  const initialize = async () => {
    reset();

    // Wait for reset
    await nextTick();

    // Initialize player
    $player.value = create(store.model.dash_url || '', store.token, video.value);
  };

  const update = async (request: PlayerRequest) => {
    // Screen
    if (request.fullscreen) await $q.fullscreen.toggle(container.value);
    if (request.fullscreen || request.resolution) $player.value?.updatePortalSize();

    // Playback
    if (request.pause && $player.value?.isPaused()) $player.value?.play();
    else if (request.pause && !$player.value?.isPaused()) $player.value?.pause();

    // Seeking
    if (request.seek) $player.value?.seek(request.seek);
  };

  const thumbnail = async (payload: number) => getThumbnailUrl(payload);

  return {
    store,
    container,
    video,
    duration,
    resolution,
    time,
    initialize,
    update,
    reset,
    thumbnail,
  };
};
