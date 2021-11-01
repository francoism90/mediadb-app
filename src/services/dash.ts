import { MediaPlayer, MediaPlayerClass } from 'dashjs';
import { findIndex } from 'lodash';
import { PlayerProperties, PlayerTrack } from 'src/interfaces';
import { playerStore, videoStore } from 'src/store';

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

export const appendTrack = (player: MediaPlayerClass | undefined, track: PlayerTrack) => {
  const element = document.createElement('track');

  element.setAttribute('id', track.id);
  element.setAttribute('kind', track.kind);
  element.setAttribute('label', track.label);
  element.setAttribute('srclang', track.srclang);
  element.setAttribute('src', track.src);

  player?.getVideoElement()?.appendChild(element);
};

export const getTextTrackIndex = (player: MediaPlayerClass, track: TextTrack) => findIndex(player.getVideoElement()?.textTracks, track);

export const showTextTrack = (player: MediaPlayerClass, track: TextTrack) => {
  const index = getTextTrackIndex(player, track);

  if (player?.getVideoElement() && index >= 0) {
    player.getVideoElement().textTracks[index].mode = 'showing';
  }
};

export const syncListener = (player: MediaPlayerClass, event: string) => {
  if (event === 'playbackMetaDataLoaded') {
    // Append sprite track
    appendTrack(player, <PlayerTrack>{
      id: 'sprite',
      kind: 'metadata',
      label: 'sprite',
      srclang: 'en',
      src: videoStore.data?.sprite_url || '',
    });

    // Enable sprite track
    showTextTrack(player, <TextTrack>{ label: 'sprite' });
  }

  playerStore.sync(<PlayerProperties>{
    ready: player.isReady(),
    autoplay: player.getAutoPlay(),
    buffered: player.getBufferLength('video'),
    duration: player.duration(),
    muted: player.isMuted(),
    paused: player.isPaused(),
    playbackRate: player.getPlaybackRate(),
    seeking: player.isSeeking(),
    tracks: player.getVideoElement()?.textTracks,
    textTrack: player.getCurrentTrackFor('text'),
    textTracks: player.getTracksFor('text'),
    videoTrack: player.getCurrentTrackFor('video'),
    videoTracks: player.getTracksFor('video'),
    time: player.time(),
    volume: player.getVolume(),
  });
};

export const startListeners = (player: MediaPlayerClass | undefined) => {
  syncEvents.forEach((event) => {
    player?.on(event, () => syncListener(player, event));
  });
};

export const stopListeners = (player: MediaPlayerClass | undefined) => {
  syncEvents.forEach((event) => {
    player?.off(event, () => syncListener(player, event));
  });
};

export const create = (source: string, token: string, view: HTMLElement | undefined) => {
  const player = MediaPlayer().create();

  player.extend('RequestModifier', () => ({
    modifyRequestHeader(xhr: XMLHttpRequest) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      return xhr;
    },
  }), true);

  player.initialize(view, source, true);

  startListeners(player);

  return player;
};

export const destroy = (player: MediaPlayerClass | undefined) => {
  player?.pause();

  player?.getVideoElement()?.childNodes?.forEach((child) => {
    player.getVideoElement()?.removeChild(child);
  });

  // @doc https://stackoverflow.com/a/28060352
  player?.getVideoElement()?.removeAttribute('src');
  player?.getVideoElement()?.load();

  player?.reset();
  player?.destroy();
};
