import { MediaPlayer, MediaPlayerClass } from 'dashjs';
import { find } from 'lodash';
import { VideoModel } from 'src/interfaces/video';
import { dashjs } from 'src/services/player';
import { useStore } from 'src/store/video/player';
import { ref } from 'vue';

export default function useDash() {
  const store = useStore();

  const player = ref<MediaPlayerClass>();
  const container = ref<HTMLDivElement>();
  const video = ref<HTMLMediaElement>();

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
        textTracks: video.value?.textTracks,
        time: player.value?.time(),
        volume: player.value?.getVolume(),
      },
    });
  };

  const tracksListener = (): void => {
    const spriteCue = find(video.value?.textTracks, { label: 'sprite' });
    const spriteTrack = find(player.value?.getTracksFor('text'), { lang: 'sprite' });

    // player.value?.setTextTrack(0);
    // player.value?.setTextTrack(1);
    player.value?.setTextTrack(2);
    // player.value?.setTextTrack(3);

    console.log('cue', spriteCue);
    console.log('track', spriteTrack);
    console.log('tracks', video.value?.textTracks);

    // player.value?.setTextTrack(-1);

    if (spriteCue) {
      // player.value?.setTextTrack(sprite.);
      spriteCue.mode = 'showing';
    }
  };

  const addListeners = (): void => {
    dashjs.listeners.forEach((event) => {
      player.value?.on(event, listener);
    });

    player.value?.on('allTextTracksAdded', tracksListener);
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

    player.value = MediaPlayer().create();

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
