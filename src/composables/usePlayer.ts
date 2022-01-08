import { MediaPlayerClass } from 'dashjs';
import { useQuasar } from 'quasar';
import { useVideo } from 'src/composables/useVideo';
import { timeFormat } from 'src/helpers';
import { PlayerEvent } from 'src/interfaces';
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

  const thumbnail = async (payload: number) => getThumbnailUrl(payload);

  const manager = async (event: PlayerEvent) => {
    const { name, params } = event;

    switch (name) {
      case 'UpdatePortal':
        $player.value?.updatePortalSize();
        break;

      case 'ToggleFullscreen':
        await $q.fullscreen.toggle(container.value);
        break;

      case 'TogglePlayback':
        if ($player.value?.isPaused()) $player.value?.play();
        else $player.value?.pause();
        break;

      case 'PlayerSeek':
        $player.value?.seek(<number>params || 0);
        break;

      case 'FastRewind':
        $player.value?.seek((store.properties?.time || 10) - 10);
        break;

      case 'FastForward':
        $player.value?.seek((store.properties?.time || 0) + 10);
        break;

      case 'CreateCapture':
        await update(store.model.id, { ...store.model, ...{ thumbnail: store.properties?.time || store.model?.thumbnail } });
        break;

      default:
    }
  };

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
