import { MediaInfo, MediaPlayer, MediaPlayerClass } from 'dashjs';
import { find, findIndex, inRange } from 'lodash';
import { PlayerProperties, PlayerTrack } from 'src/interfaces';
import { blob } from 'src/services/api';
import { useStore } from 'src/store/videos/player';

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

export const resolutions = [
  { label: '2160p', icon: '4K', width: 3840, height: 2160 },
  { label: '1440p', icon: '2k', width: 2560, height: 1440 },
  { label: '1080p', icon: 'hd', width: 1920, height: 1080 },
  { label: '720p', icon: 'hd', width: 1280, height: 720 },
  { label: '480p', icon: 'sd', width: 854, height: 480 },
  { label: '360p', icon: 'sd', width: 640, height: 360 },
  { label: '240p', icon: 'sd', width: 426, height: 240 },
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

export const getTextTrackIndex = (player: MediaPlayerClass | undefined, track: TextTrack) => findIndex(player?.getVideoElement()?.textTracks, track);

export const showTextTrack = (player: MediaPlayerClass | undefined, track: TextTrack) => {
  const index = getTextTrackIndex(player, track);

  if (player?.getVideoElement() && index >= 0) {
    player.getVideoElement().textTracks[index].mode = 'showing';
  }
};

export const setSpriteTrack = (player: MediaPlayerClass | undefined) => {
  appendTrack(player, <PlayerTrack>{
    id: 'sprite',
    kind: 'metadata',
    label: 'sprite',
    srclang: 'en',
    src: store.model.sprite_url,
  });

  showTextTrack(player, <TextTrack>{ label: 'sprite' });
};

export const getVideoTrack = () => store.properties?.videoTrack as MediaInfo | undefined;

export const getVideoBitrate = () => getVideoTrack()?.bitrateList.find(Boolean);

export const listener = (player: MediaPlayerClass | undefined, event: string) => {
  store.sync(<PlayerProperties>{
    ready: player?.isReady(),
    autoplay: player?.getAutoPlay(),
    buffered: player?.getBufferLength('video'),
    duration: player?.duration(),
    muted: player?.isMuted(),
    paused: player?.isPaused(),
    playbackRate: player?.getPlaybackRate(),
    seeking: player?.isSeeking(),
    source: player?.getSource(),
    tracks: player?.getVideoElement()?.textTracks,
    textTrack: player?.getCurrentTrackFor('text'),
    textTracks: player?.getTracksFor('text'),
    videoTrack: player?.getCurrentTrackFor('video'),
    videoTracks: player?.getTracksFor('video'),
    time: player?.time(),
    volume: player?.getVolume(),
  });

  if (event === 'playbackMetaDataLoaded') {
    window.setTimeout(() => {
      // TODO: add resume
      setSpriteTrack(player);
    }, 100);
  }
};

export const useListeners = (player: MediaPlayerClass | undefined) => {
  events.forEach((event) => {
    player?.on(event, () => listener(player, event));
  });
};

export const removeListeners = (player: MediaPlayerClass | undefined) => {
  events.forEach((event) => {
    player?.off(event, () => listener(player, event));
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

  useListeners(player);

  return player;
};

export const destroy = (player: MediaPlayerClass | undefined) => {
  removeListeners(player);

  player?.getVideoElement()?.childNodes?.forEach((child) => {
    player.getVideoElement()?.removeChild(child);
  });

  // @doc https://stackoverflow.com/a/28060352
  player?.getVideoElement()?.removeAttribute('src');
  player?.getVideoElement()?.load();

  player?.reset();
  player?.destroy();

  store.$reset();
};

export const getCueByTime = (track: TextTrack | undefined, time: number) => find(
  track?.cues,
  (o: VTTCue) => inRange(time, o.startTime, o.endTime),
);

export const getThumbnailUrl = async (time: number) => {
  const cue = getCueByTime(store.spriteTrack, time) as VTTCue;
  const obj = JSON.parse(cue?.text || '{}') as PlayerTrack;

  return blob(obj?.src || '');
};

export const getResolutionMatch = (height: number, width: number) => {
  const heightMatch = resolutions.find((e) => height >= e.height);
  const widthMatch = resolutions.find((e) => width >= e.width);

  return heightMatch || widthMatch;
};

export const getResolution = () => {
  const bitrate = getVideoBitrate();

  return getResolutionMatch(bitrate?.height || 0, bitrate?.width || 0);
};
