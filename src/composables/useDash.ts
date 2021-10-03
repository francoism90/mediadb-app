import { MediaPlayerClass } from 'dashjs';
import { useQuasar } from 'quasar';
import { VideoModel } from 'src/interfaces/video';
import { destroy, initialize, store, sync } from 'src/services/dash';
import { nextTick, ref, watch } from 'vue';

export default function useDash() {
  const $q = useQuasar();

  const player = ref<MediaPlayerClass | undefined>();
  const container = ref<HTMLDivElement>();
  const video = ref<HTMLVideoElement>();

  const unload = (): void => {
    destroy(player.value);
  };

  const load = async (model: VideoModel): Promise<void> => {
    unload();

    // Wait for reset
    await nextTick();

    // Initialize player
    player.value = initialize(video.value, model.dash_url);

    // Sync events & fill store
    sync(player.value, model);
  };

  watch(() => $q.fullscreen.isActive, (): void => player.value?.updatePortalSize());
  watch(() => $q.screen.name, (): void => player.value?.updatePortalSize());

  return {
    load,
    unload,
    container,
    video,
    player,
    store,
  };
}
