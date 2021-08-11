import { Player } from 'shaka-player';
import { initialize } from 'src/services/shaka';
import { readonlyProperties, syncEvents } from 'src/services/player';
import { useStore } from 'src/store/player';
import { ref } from 'vue';
import { debounce, pick } from 'lodash';
import { PlayerProperties } from 'src/interfaces/player';

export default function usePlayer() {
  const player = ref<Player>();
  const store = useStore();

  const setProperties = (event: Event | null): void => {
    const target = event?.target as HTMLMediaElement;
    const properties = <PlayerProperties>pick(target, readonlyProperties);

    store.populate(properties);
  };

  const syncProperties = debounce(setProperties, 100);

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

  const loadVideo = async (dom: HTMLMediaElement | null): Promise<void> => {
    try {
      const shakaPlayer = initialize(dom);
      player.value = await shakaPlayer.load(store.source) as Player;
    } catch (e: unknown) {
      console.error(e);
    }
  };

  const destroy = async (dom: HTMLMediaElement | null): Promise<void> => {
    destroyEvents(dom);

    await player.value?.detach();
    await player.value?.destroy();

    // @doc https://stackoverflow.com/a/28060352
    dom?.pause();
    dom?.removeAttribute('src');
    dom?.load();
  };

  return {
    useEvents,
    destroy,
    destroyEvents,
    loadVideo,
    player,
    store,
  };
}
