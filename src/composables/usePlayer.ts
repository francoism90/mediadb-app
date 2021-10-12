import { MediaPlayerClass } from 'dashjs';
import { PlayerSource } from 'src/interfaces/player';
import { destroy, initialize, store, update } from 'src/services/player';
import { nextTick, ref } from 'vue';

export default function usePlayer() {
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
  };

  return {
    load,
    unload,
    update,
    container,
    video,
    player,
    store,
  };
}
