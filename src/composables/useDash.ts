import { MediaPlayer, MediaPlayerClass } from 'dashjs';
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
  const video = ref<HTMLVideoElement>();

  const setAttributes = (): void => {
    // Metadata
    // video.value?.setAttribute('height', store.model.clip?.metadata?.height?.toString() || '360');
    // video.value?.setAttribute('width', store.model.clip?.metadata?.width?.toString() || '720');
    video.value?.setAttribute('poster', store.model.poster_url || '');

    // Tracks
    const track = document.createElement('track');
    track.id = 'sprite';
    track.kind = 'metadata';
    track.label = 'sprite';
    track.srclang = 'en';
    track.src = store.model?.sprite_url || '';

    video.value?.appendChild(track);
  };

  const setTracks = (): void => {
    const spriteIndex = findIndex(video.value?.textTracks, { label: 'sprite' });

    if (typeof spriteIndex === 'number' && video.value) {
      video.value.textTracks[spriteIndex].mode = 'showing';
    }
  };

  const listener = (): void => {
    if (!store.isReady || typeof player.value === 'undefined' || typeof video.value === 'undefined') {
      return;
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

  const setListeners = (): void => {
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

    // Reset player
    player.value?.reset();
    player.value?.destroy();

    // Reset video
    video.value?.childNodes?.forEach((child) => {
      video.value?.removeChild(child);
    });

    // @doc https://stackoverflow.com/a/28060352
    video.value?.removeAttribute('src');
    video.value?.load();

    store.$reset();
  };

  const attach = (model: VideoModel): void => {
    store.$patch({ model });

    const manifestUri = store.model?.dash_url || '';
    const token = getToken() || '';

    player.value = MediaPlayer().create();

    // Add Authorization header
    player.value?.extend('RequestModifier', () => ({
      modifyRequestHeader(xhr: XMLHttpRequest) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        return xhr;
      },
    }), true);

    player.value?.initialize(video.value, manifestUri, false);
    player.value?.enableForcedTextStreaming(true);

    player.value?.on('playbackMetaDataLoaded', () => {
      setAttributes();
      setTracks();
      setListeners();
    });
  };

  const load = (model: VideoModel): void => {
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
