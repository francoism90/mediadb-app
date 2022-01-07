import { Player } from 'shaka-player';
import { VideoModel } from 'src/interfaces';
import { create, eventManager, events, store, sync } from 'src/services/player';
import { ref } from 'vue';

export const usePlayer = () => {
  const $player = ref<Player>();
  const container = ref<HTMLDivElement>();
  const element = ref<HTMLMediaElement>();

  const manager = eventManager();

  const initialize = async (model: VideoModel, token: string) => {
    if (!element.value) {
      return;
    }

    $player.value = await create(model, element.value, token);

    events.forEach((event) => {
      manager.listen(element.value as HTMLMediaElement, event, () => sync(element.value));
    });
  };

  const reset = async () => {
    // Stop event listeners
    manager.removeAll();

    // Destroy player
    await $player.value?.destroy();

    /// @doc https://stackoverflow.com/a/28060352
    element.value?.removeAttribute('src');
    element.value?.load();

    // Reset store
    store.$reset();
  };

  return {
    initialize,
    reset,
    container,
    element,
  };
};
