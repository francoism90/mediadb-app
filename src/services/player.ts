import { MediaPlayer, MediaPlayerClass } from 'dashjs';
import { find, findIndex, inRange } from 'lodash';
import { PlayerTrack } from 'src/interfaces';
import { blob } from 'src/services/api';

export const events = [
  { type: 'bufferLevelUpdated' },
  { type: 'bufferLoaded' },
  { type: 'bufferStalled' },
  { type: 'bufferStateChanged' },
  { type: 'canPlay' },
  { type: 'canPlayThrough' },
  { type: 'playbackEnded' },
  { type: 'playbackError' },
  { type: 'playbackLoadedData' },
  { type: 'playbackMetaDataLoaded' },
  { type: 'playbackNotAllowed' },
  { type: 'playbackPaused' },
  { type: 'playbackPlaying' },
  { type: 'playbackProgress' },
  { type: 'playbackRateChanged' },
  { type: 'playbackSeekAsked' },
  { type: 'playbackSeeked' },
  { type: 'playbackSeeking' },
  { type: 'PlaybackSeekingEvent' },
  { type: 'playbackStalled' },
  { type: 'playbackStarted' },
  { type: 'playbackTimeUpdated' },
  { type: 'playbackWaiting' },
  { type: 'qualityChangeRendered' },
  { type: 'qualityChangeRequested' },
  { type: 'textTrackAdded' },
  { type: 'trackChangeRendered' },
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

export const addListeners = (player: MediaPlayerClass | undefined, callback: () => void) => {
  events.forEach((event) => {
    player?.on(event.type, callback);
  });
};

// export const removeListeners = (player: MediaPlayerClass | undefined, callback: (type: string) => {
//   events.forEach((event) => {
//     player?.off(event.type, () => callback);
//   });
// };

export const create = (source: string, token: string, view: HTMLElement | undefined) => {
  const player = MediaPlayer().create();

  player.extend('RequestModifier', () => ({
    modifyRequestHeader(xhr: XMLHttpRequest) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      return xhr;
    },
  }), true);

  player.initialize(view, source, true);

  return player;
};

export const destroy = (player: MediaPlayerClass | undefined) => {
  player?.getVideoElement()?.childNodes?.forEach((child) => {
    player.getVideoElement()?.removeChild(child);
  });

  player?.pause();
};

export const getTrackCueByTime = (track: TextTrack | null | undefined, time: number) => find(
  track?.cues,
  (o: VTTCue) => inRange(time, o.startTime, o.endTime),
);

export const getTrackCueBlob = async (player: MediaPlayerClass | undefined, id: string, time: number) => {
  const track = player?.getVideoElement().textTracks.getTrackById(id);

  const cue = getTrackCueByTime(track, time) as VTTCue;
  const obj = JSON.parse(cue?.text || '{}') as PlayerTrack;

  return blob(obj?.src || '');
};

export const getVideoResolution = (height: number, width: number) => {
  const heightMatch = resolutions.find((e) => height >= e.height);
  const widthMatch = resolutions.find((e) => width >= e.width);

  return heightMatch || widthMatch;
};

export const getVideoTrackResolution = (player: MediaPlayerClass | undefined) => {
  const bitrate = player?.getTopBitrateInfoFor('video');

  return getVideoResolution(bitrate?.height || 0, bitrate?.width || 0);
};
