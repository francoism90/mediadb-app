import { debounce, pick } from 'lodash';
import { Player } from 'shaka-player';
import { PlayerProperties } from 'src/interfaces/player';
import { readonlyProperties, syncEvents } from 'src/services/player';
import { initialize } from 'src/services/shaka';
import { useStore } from 'src/store/player';
import { ref } from 'vue';

export default function usePlayer() {
  const player = ref<Player>();
  const store = useStore();

  const setProperties = (event: Event): void => {
    const target = event.target as HTMLMediaElement;
    const properties = <PlayerProperties>pick(target, readonlyProperties);

    store.update(properties);
  };

  const syncProperties = debounce(setProperties, 100);

  const addListenters = (dom: HTMLMediaElement | undefined): void => {
    syncEvents.forEach((event) => {
      dom?.addEventListener(event, syncProperties);
    });
  };

  const removeListenters = (dom: HTMLMediaElement | undefined): void => {
    syncEvents.forEach((event) => {
      dom?.removeEventListener(event, syncProperties);
    });
  };

  const detach = async (dom: HTMLMediaElement | undefined): Promise<Promise<void>> => {
    removeListenters(dom);

    await player.value?.detach();
    await player.value?.destroy();

    // @doc https://stackoverflow.com/a/28060352
    dom?.pause();
    dom?.removeAttribute('src');
    dom?.load();
  };

  const attach = async (dom: HTMLMediaElement | undefined): Promise<void> => {
    try {
      const video = store.source?.vod_url || store.source?.live_url || null;

      if (video) {
        const shakaPlayer = initialize(dom);
        player.value = await shakaPlayer.load(video) as Player;
      }

      addListenters(dom);
    } catch (e: unknown) {
      console.error(e);
    }
  };

  const load = async (dom: HTMLMediaElement | undefined): Promise<void> => {
    await detach(dom);
    await attach(dom);
  };

  const destroy = async (dom: HTMLMediaElement | undefined): Promise<void> => {
    await detach(dom);
    store.$reset();
  };

  return {
    load,
    attach,
    detach,
    destroy,
    player,
    store,
  };
}
