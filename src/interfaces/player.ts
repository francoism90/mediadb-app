import { VideoModel } from 'src/interfaces/video';

export interface PlayerProperties {
  buffered: TimeRanges | null,
  controls: boolean,
  currentSrc: string | null,
  currentTime: number | null,
  duration: number | null,
  ended: boolean | null,
  error: string | null,
  fullscreen: boolean,
  muted: boolean | null,
  networkState: number | null,
  paused: boolean | null,
  playbackRate: number,
  played: TimeRanges | null,
  readyState: number | null,
  requestTime: number,
  seekable: TimeRanges | null,
  seeking: boolean | null,
  textTracks: TextTrackList | null,
  volume: number,
}

export interface PlayerTooltip {
  cue: VTTCue | null,
  position: number,
  time: number,
}

export interface PlayerState {
  ready: boolean,
  id: string | number | null,
  // audio?: AudioModel,
  video?: VideoModel,
  properties: PlayerProperties,
}
