import { Event, MediaPlayer, MediaPlayerClass } from 'dashjs';
import { find, findIndex, inRange } from 'lodash';
import { PlayerTrack } from 'src/interfaces';
import { api } from 'src/services/api';

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

// eslint-disable-next-line no-unused-vars
export const addListeners = (player: MediaPlayerClass | undefined, callback: (event: Event) => void) => {
  events.forEach((event) => {
    player?.on(event.type, callback);
  });
};

// eslint-disable-next-line no-unused-vars
export const removeListeners = (player: MediaPlayerClass | undefined, callback: (event: Event) => void) => {
  events.forEach((event) => {
    player?.off(event.type, callback);
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

  return player;
};

export const destroy = (player: MediaPlayerClass | undefined) => {
  player?.getVideoElement()?.childNodes?.forEach((child) => {
    player.getVideoElement()?.removeChild(child);
  });

  player?.destroy();
};

export const getTrackCueByTime = (track: TextTrack | null | undefined, time: number) => find(
  track?.cues,
  (o: VTTCue) => inRange(time, o.startTime, o.endTime),
);

export const getTrackCueBlob = (player: MediaPlayerClass | undefined, id: string, time: number) => {
  const track = player?.getVideoElement().textTracks.getTrackById(id);

  const cue = getTrackCueByTime(track, time) as VTTCue;
  const obj = JSON.parse(cue?.text || '{}') as PlayerTrack;

  return api(obj.src, { method: 'GET' }, { refetch: true }).blob();
};
