import { Bitrate, MediaPlayer, MediaPlayerClass } from 'dashjs';
import { findIndex } from 'lodash';
import { PlayerProperties } from 'src/interfaces/player';
import { getToken } from 'src/services/auth';
import { store } from 'src/services/player';

export const syncEvents = [
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

export const setSpriteTrack = (player: MediaPlayerClass): void => {
  const track = document.createElement('track');
  track.id = 'sprite';
  track.kind = 'metadata';
  track.label = 'sprite';
  track.srclang = 'en';
  track.src = store.spriteUrl;

  player.getVideoElement()?.appendChild(track);
};

export const setTracks = (player: MediaPlayerClass): void => {
  const spriteIndex = findIndex(player.getVideoElement()?.textTracks, { label: 'sprite' });

  if (player.getVideoElement() && spriteIndex >= 0) {
    player.getVideoElement().textTracks[spriteIndex].mode = 'showing';
  }
};

export const videoTrackBitrate = (): Bitrate | undefined => store
  .properties?.videoTrack?.bitrateList?.find(Boolean);

export const eventListener = (player: MediaPlayerClass, event: string): void => {
  if (event === 'playbackMetaDataLoaded') {
    setSpriteTrack(player);
    setTracks(player);
  }

  store.sync(<PlayerProperties>{
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
  });
};

export const startListeners = (player: MediaPlayerClass): void => {
  syncEvents.forEach((event) => {
    player?.on(event, () => eventListener(player, event));
  });
};

export const stopListeners = (player: MediaPlayerClass | undefined): void => {
  syncEvents.forEach((event) => {
    player?.off(event, () => eventListener(player, event));
  });
};

export const create = (view: HTMLElement): MediaPlayerClass => {
  const player = MediaPlayer().create();
  const token = getToken() || '';

  // Add Authorization header
  player.extend('RequestModifier', () => ({
    modifyRequestHeader(xhr: XMLHttpRequest) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      return xhr;
    },
  }), true);

  // Initialize player player
  player.initialize(view, store.source?.url, true);

  // Set listeners
  startListeners(player);

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
};
