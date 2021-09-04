import { Event as MediaPlayerEvent, MediaPlayer, MediaPlayerClass } from 'dashjs';
import { findIndex } from 'lodash';
import { VideoModel } from 'src/interfaces/video';
import { getToken } from 'src/services/auth';
import { dashjs } from 'src/services/player';
import { useStore } from 'src/store/video/player';
import { ref } from 'vue';

export default function useDash() {
  const store = useStore();

  const player = ref<MediaPlayerClass>();
  const container = ref<HTMLDivElement>();
  const video = ref<HTMLMediaElement>();

  const activateTracks = (): void => {
    const spriteIndex = findIndex(video.value?.textTracks, { label: 'sprite' });

    if (typeof spriteIndex === 'number' && video.value) {
      video.value.textTracks[spriteIndex].mode = 'showing';
    }
  };

  const listener = (event: MediaPlayerEvent): void => {
    if (dashjs.textListeners.includes(event.type)) {
      activateTracks();
    }

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
        textTracks: video.value?.textTracks,
        time: player.value?.time(),
        volume: player.value?.getVolume(),
      },
    });
  };

  const addListeners = (): void => {
    dashjs.listeners.forEach((event) => {
      player.value?.on(event, listener);
    });
  };

  const removeListeners = (): void => {
    dashjs.listeners.forEach((event) => {
      player.value?.off(event, listener);
    });
  };

  const detach = (): void => {
    removeListeners();

    player.value?.reset();
    player.value?.destroy();

    // @doc https://stackoverflow.com/a/28060352
    video.value?.pause();
    video.value?.removeAttribute('src');
    video.value?.load();
  };

  const attach = (model: VideoModel): void => {
    store.model = model;

    const manifestUri = store.model?.vod_url || store.model?.live_url || '';
    const token = getToken() || '';

    player.value = MediaPlayer().create();

    player.value?.extend('RequestModifier', () => ({
      modifyRequestHeader(xhr: XMLHttpRequest) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        return xhr;
      },
    }), true);

    player.value?.initialize(video.value, manifestUri, false);
    player.value?.enableForcedTextStreaming(true);

    addListeners();
  };

  const load = (model: VideoModel): void => {
    store.$reset();

    detach();
    attach(model);
  };

  const destroy = (): void => {
    detach();
  };

  return {
    load,
    destroy,
    container,
    video,
    player,
    store,
  };
}
