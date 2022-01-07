import { useQuasar } from 'quasar';
import { Player } from 'shaka-player';
import { PlayerRequest, VideoModel } from 'src/interfaces';
import { create, eventManager, events, store, sync } from 'src/services/player';
import { ref } from 'vue';

export const usePlayer = () => {
  const $q = useQuasar();

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

  const update = async (request: PlayerRequest) => {
    // Screen
    if (request.fullscreen) await $q.fullscreen.toggle(container.value);

    // Playback
    if (request.pause && element.value?.paused) await element.value?.play();
    else if (request.pause && !element.value?.paused) element.value?.pause();

    // Seeking
    if (request.seek && element.value?.currentTime) element.value.currentTime = request.seek || 0;
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
    container,
    element,
    store,
    initialize,
    update,
    reset,
  };
};
