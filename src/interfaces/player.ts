import { MediaModel } from 'src/interfaces/media';
import { VideoModel } from 'src/interfaces/video';

export interface PlayerProps {
  module: string,
  media: MediaModel | null,
  video?: VideoModel,
}

export interface PlayerTooltip {
  cue: VTTCue | null,
  position: number,
  time: number,
}

export interface PlayerProperties {
  buffered: TimeRanges | null,
  controls: boolean,
  currentSrc: string,
  currentTime: number,
  duration: number,
  ended: boolean,
  error: string | null,
  fullscreen: boolean,
  muted: boolean,
  networkState: number,
  paused: boolean,
  playbackRate: number,
  played: TimeRanges | null,
  readyState: number,
  requestTime: number,
  seekable: TimeRanges | null,
  seeking: boolean,
  textTracks: TextTrackList | null,
  volume: number,
}

export interface PlayerState {
  media: MediaModel,
  video?: VideoModel,
  properties: PlayerProperties,
}
