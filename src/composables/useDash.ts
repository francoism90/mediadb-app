import { MediaPlayer, MediaPlayerClass } from 'dashjs';
import { VideoModel } from 'src/interfaces/video';
import { dashjs } from 'src/services/player';
import { useStore } from 'src/store/video/player';
import { ref } from 'vue';

export default function useDash() {
  const store = useStore();
  const player = ref<MediaPlayerClass>();

  const listener = (): void => {
    store.$patch({
      properties: {
        ready: player.value?.isReady(),
        autoplay: player.value?.getAutoPlay(),
        buffered: player.value?.getBufferLength('video'),
        duration: player.value?.duration(),
        muted: player.value?.isMuted(),
        paused: player.value?.isPaused(),
        playbackRate: player.value?.getPlaybackRate(),
        quality: player.value?.getQualityFor('video'),
        seeking: player.value?.isSeeking(),
        time: player.value?.time(),
        volume: player.value?.getVolume(),
      },
    });
  };

  const addListenters = (): void => {
    dashjs.listeners.forEach((event) => {
      player.value?.on(event, listener);
    });
  };

  const removeListenters = (): void => {
    dashjs.listeners.forEach((event) => {
      player.value?.off(event, listener);
    });
  };

  const detach = (dom: HTMLMediaElement | undefined): void => {
    removeListenters();

    player.value?.reset();
    player.value?.destroy();

    // @doc https://stackoverflow.com/a/28060352
    dom?.pause();
    dom?.removeAttribute('src');
    dom?.load();
  };

  const attach = (model: VideoModel, dom: HTMLMediaElement | undefined): void => {
    store.model = model;

    const manifestUri = store.model?.vod_url || store.model?.live_url || '';

    player.value = MediaPlayer().create();
    player.value?.initialize(dom, manifestUri, true);

    addListenters();
  };

  const load = (model: VideoModel, dom: HTMLMediaElement | undefined): void => {
    store.$reset();

    detach(dom);
    attach(model, dom);
  };

  const destroy = (dom: HTMLMediaElement | undefined): void => {
    detach(dom);
  };

  return {
    load,
    destroy,
    player,
    store,
  };
}
