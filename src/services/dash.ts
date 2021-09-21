import { MediaPlayer, MediaPlayerClass } from 'dashjs';
import { findIndex } from 'lodash';
import { VideoModel } from 'src/interfaces/video';
import { getToken } from 'src/services/auth';
import { useStore } from 'src/store/player';

export const store = useStore();

export const events = [
  'bufferLevelUpdated',
  'bufferLoaded',
  'bufferStalled',
  'bufferStateChanged',
  'canPlay',
  'canPlayThrough',
  'playbackEnded',
  'playbackError',
  'playbackLoadedData',
  'playbackMetaDataLoaded',
  'playbackNotAllowed',
  'playbackPaused',
  'playbackPlaying',
  'playbackProgress',
  'playbackRateChanged',
  'playbackSeekAsked',
  'playbackSeeked',
  'playbackSeeking',
  'PlaybackSeekingEvent',
  'playbackStalled',
  'playbackStarted',
  'playbackTimeUpdated',
  'playbackWaiting',
  'qualityChangeRendered',
  'qualityChangeRequested',
  'textTrackAdded',
  'trackChangeRendered',
];

export const populate = (player: MediaPlayerClass | undefined): void => {
  if (!store.isReady) {
    return;
  }

  store.$patch({
    properties: {
      ready: player?.isReady(),
      autoplay: player?.getAutoPlay(),
      buffered: player?.getBufferLength('video'),
      duration: player?.duration(),
      muted: player?.isMuted(),
      paused: player?.isPaused(),
      playbackRate: player?.getPlaybackRate(),
      seeking: player?.isSeeking(),
      tracks: player?.getVideoElement()?.textTracks,
      textTrack: player?.getCurrentTrackFor('text'),
      videoTrack: player?.getCurrentTrackFor('video'),
      textTracks: player?.getTracksFor('text'),
      videoTracks: player?.getTracksFor('video'),
      time: player?.time(),
      volume: player?.getVolume(),
    },
  });
};

export const setAttributes = (player: MediaPlayerClass | undefined): void => {
  // Sprite track
  const track = document.createElement('track');
  track.id = 'sprite';
  track.kind = 'metadata';
  track.label = 'sprite';
  track.srclang = 'en';
  track.src = store.model?.sprite_url || '';

  player?.getVideoElement()?.appendChild(track);
};

export const setTracks = (player: MediaPlayerClass | undefined): void => {
  const spriteIndex = findIndex(player?.getVideoElement()?.textTracks, { label: 'sprite' });

  if (player?.getVideoElement() && typeof spriteIndex === 'number') {
    player.getVideoElement().textTracks[spriteIndex].mode = 'showing';
  }
};

export const sync = (player: MediaPlayerClass | undefined, model: VideoModel): void => {
  store.$patch({ model });

  events.forEach((event) => {
    player?.on(event, () => populate(player));
  });

  player?.on('playbackMetaDataLoaded', () => {
    setAttributes(player);
    setTracks(player);
  });
};

export const stopListeners = (player: MediaPlayerClass | undefined): void => {
  events.forEach((event) => {
    player?.off(event, () => populate(player));
  });
};

export const initialize = (view: HTMLElement | undefined, source?: string): MediaPlayerClass => {
  const player = MediaPlayer().create();
  const token = getToken() || '';

  // Add Authorization header
  player.extend('RequestModifier', () => ({
    modifyRequestHeader(xhr: XMLHttpRequest) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      return xhr;
    },
  }), true);

  player.initialize(view, source, true);
  player.enableForcedTextStreaming(true);

  return player;
};

export const destroy = (player: MediaPlayerClass | undefined): void => {
  // Stop playback
  player?.pause();

  // Remove listeners
  stopListeners(player);

  // Reset video elements
  player?.getVideoElement()?.childNodes?.forEach((child) => {
    player.getVideoElement()?.removeChild(child);
  });

  // @doc https://stackoverflow.com/a/28060352
  player?.getVideoElement()?.removeAttribute('src');
  player?.getVideoElement()?.load();

  // Reset player
  player?.reset();
  player?.destroy();

  store.$reset();
};
