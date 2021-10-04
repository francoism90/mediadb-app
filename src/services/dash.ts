import { MediaPlayer, MediaPlayerClass } from 'dashjs';
import { findIndex } from 'lodash';
import { PlayerProperties, PlayerSource } from 'src/interfaces/player';
import { getToken } from 'src/services/auth';
import { useStore } from 'src/store/video/player';

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

export const populate = (player: MediaPlayerClass | undefined): void => store.sync(
  <PlayerProperties>{
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
    textTracks: player?.getTracksFor('text'),
    videoTrack: player?.getCurrentTrackFor('video'),
    videoTracks: player?.getTracksFor('video'),
    time: player?.time(),
    volume: player?.getVolume(),
  },
);

export const setSpriteTrack = (player: MediaPlayerClass | undefined): void => {
  const track = document.createElement('track');
  track.id = 'sprite';
  track.kind = 'metadata';
  track.label = 'sprite';
  track.srclang = 'en';
  track.src = store.spriteUrl;

  player?.getVideoElement()?.appendChild(track);
};

export const setTracks = (player: MediaPlayerClass | undefined): void => {
  const spriteIndex = findIndex(player?.getVideoElement()?.textTracks, { label: 'sprite' });

  if (player?.getVideoElement() && spriteIndex >= 0) {
    player.getVideoElement().textTracks[spriteIndex].mode = 'showing';
  }
};

export const sync = (player: MediaPlayerClass | undefined): void => {
  events.forEach((event) => {
    player?.on(event, () => populate(player));
  });

  player?.on('playbackMetaDataLoaded', () => {
    setSpriteTrack(player);
    setTracks(player);
  });
};

export const stopListeners = (player: MediaPlayerClass | undefined): void => {
  events.forEach((event) => {
    player?.off(event, () => populate(player));
  });
};

export const initialize = (
  source: PlayerSource,
  view: HTMLElement | undefined,
): MediaPlayerClass => {
  const player = MediaPlayer().create();
  const token = getToken() || '';

  // Populate source
  store.$patch({ source });

  // Add Authorization header
  player.extend('RequestModifier', () => ({
    modifyRequestHeader(xhr: XMLHttpRequest) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      return xhr;
    },
  }), true);

  player.initialize();

  player.updateSettings({
    streaming: {
      buffer: {
        bufferTimeAtTopQuality: 10,
        bufferTimeAtTopQualityLongForm: 30,
        bufferToKeep: 10,
        enableSeekDecorrelationFix: true,
        flushBufferAtTrackSwitch: true,
        stableBufferTime: 5,
      },
    },
  });

  if (typeof source.url === 'string' && typeof view !== 'undefined') {
    player.attachView(view);
    player.attachSource(source.url);
    player.setAutoPlay(true);
  }

  return player;
};

export const destroy = (player: MediaPlayerClass | undefined): void => {
  // Reset store
  store.$reset();

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
};
