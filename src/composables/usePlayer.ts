import { MediaPlayerClass } from 'dashjs';
import { useQuasar } from 'quasar';
import { useVideo } from 'src/composables/useVideo';
import { timeFormat } from 'src/helpers';
import { PlayerRequest } from 'src/interfaces';
import { create, destroy, getResolution, getThumbnailUrl, store } from 'src/services/player';
import { computed, nextTick, ref } from 'vue';

export const usePlayer = () => {
  const $q = useQuasar();
  const { update } = useVideo();

  const $player = ref<MediaPlayerClass | undefined>();
  const container = ref<HTMLDivElement>();
  const video = ref<HTMLVideoElement>();

  const time = computed(() => timeFormat(store.properties?.time));
  const duration = computed(() => timeFormat(store.properties?.duration));
  const resolution = computed(() => getResolution());

  const reset = () => {
    // Set ready state
    store.ready = false;

    // Destroy player
    destroy($player.value);
  };

  const initialize = async () => {
    // Destroy player
    reset();

    // Wait for reset
    await nextTick();

    // Initialize player
    $player.value = create(store.model.dash_url || '', store.token, video.value);

    // Set ready state
    store.ready = true;
  };

  const manager = async (request: PlayerRequest) => {
    // Screen
    if (request.fullscreen) await $q.fullscreen.toggle(container.value);
    if (request.fullscreen || request.resolution) $player.value?.updatePortalSize();

    // Playback
    if (request.pause && $player.value?.isPaused()) $player.value?.play();
    else if (request.pause && !$player.value?.isPaused()) $player.value?.pause();

    // Seeking
    if (request.seek) $player.value?.seek(request.seek);
    if (request.seekBackwards) $player.value?.seek((store.properties?.time || 10) - 10);
    if (request.seekForward) $player.value?.seek((store.properties?.time || 0) + 10);

    // Capture
    if (request.capture) await update(store.model.id, { ...store.model, ...{ thumbnail: store.properties?.time || store.model?.thumbnail } });
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
    manager,
    reset,
    thumbnail,
  };
};
