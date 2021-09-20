import { MediaPlayerClass } from 'dashjs';
import { VideoModel } from 'src/interfaces/video';
import { destroy, initialize, store, sync } from 'src/services/dash';
import { nextTick, ref } from 'vue';

export default function useDash() {
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

  return {
    load,
    unload,
    container,
    video,
    player,
    store,
  };
}
