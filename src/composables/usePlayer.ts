import { MediaPlayerClass } from 'dashjs';
import { useQuasar } from 'quasar';
import { PlayerSource } from 'src/interfaces/player';
import { destroy, initialize, store, sync, update } from 'src/services/player';
import { nextTick, ref, watch } from 'vue';

export default function usePlayer() {
  const $q = useQuasar();

  const player = ref<MediaPlayerClass | undefined>();
  const container = ref<HTMLDivElement>();
  const video = ref<HTMLVideoElement>();

  const unload = (): void => {
    // Destroy player
    destroy(player.value);

    // Reset player store
    store.$reset();
  };

  const load = async (source: PlayerSource, view: HTMLElement | undefined): Promise<void> => {
    unload();

    // Wait for reset
    await nextTick();

    // Initialize player
    player.value = initialize(source, view);

    // Sync events
    sync(player.value);
  };

  watch(() => $q.fullscreen.isActive, (): void => update(player.value));
  watch(() => $q.screen.name, (): void => update(player.value));

  return {
    load,
    unload,
    container,
    video,
    player,
    store,
  };
}
