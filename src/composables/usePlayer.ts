import { Player } from 'shaka-player';
import { initialize } from 'src/services/shaka';
import { readonlyProperties, syncEvents } from 'src/services/player';
import { usePlayerStore } from 'src/store/player';
import { ref } from 'vue';
import { debounce, pick } from 'lodash';
import { PlayerProperties, PlayerProps } from 'src/interfaces/player';

export default function usePlayer() {
  const player = ref<Player>();
  const store = usePlayerStore();

  const setProperties = (event: Event | null): void => {
    const target = event?.target as HTMLMediaElement;
    const properties = <PlayerProperties>pick(target, readonlyProperties);

    store.populate(properties);
  };

  const syncProperties = debounce(setProperties, 100);

  const useVideo = async (payload: PlayerProps): Promise<void> => {
    store.initialize(payload);

    try {
      const shakaPlayer = initialize(payload.media);
      player.value = await shakaPlayer.load(store.source) as Player;
    } catch (e: unknown) {
      console.error(e);
    }
  };

  const useEvents = (dom: HTMLMediaElement | null): void => {
    syncEvents.forEach((event) => {
      dom?.addEventListener(event, syncProperties);
    });
  };

  const destroyEvents = (dom: HTMLMediaElement | null): void => {
    syncEvents.forEach((event) => {
      dom?.removeEventListener(event, syncProperties);
    });
  };

  const destroy = async (): Promise<void> => {
    await player.value?.detach();
    await player.value?.destroy();
  };

  return {
    useVideo,
    useEvents,
    destroy,
    destroyEvents,
    player,
    store,
  };
}
