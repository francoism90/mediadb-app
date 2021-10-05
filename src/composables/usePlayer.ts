import { MediaPlayerClass } from 'dashjs';
import { useQuasar } from 'quasar';
import { PlayerSource } from 'src/interfaces/player';
import { destroy, initialize, store } from 'src/services/player';
import { nextTick, ref, watch } from 'vue';

export default function usePlayer() {
  const $q = useQuasar();

  const player = ref<MediaPlayerClass | undefined>();
  const container = ref<HTMLDivElement>();
  const video = ref<HTMLVideoElement>();

  const unload = (): void => destroy(player.value);

  const load = async (source: PlayerSource, view: HTMLElement | undefined): Promise<void> => {
    unload();

    // Wait for reset
    await nextTick();

    // Initialize player
    player.value = initialize(source, view);

    // Sync events
    // sync(player.value);
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
