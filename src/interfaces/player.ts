import { DomOffset } from 'quasar';
import { Model } from 'src/interfaces/repository';

export interface PlayerProperties {
  buffered: TimeRanges | null,
  currentSrc: string | null,
  currentTime: number | null,
  duration: number | null,
  ended: boolean | null,
  error: string | null,
  fullscreen: boolean,
  fullscreenEnabled: boolean,
  muted: boolean | null,
  networkState: number | null,
  paused: boolean | null,
  playbackRate: number,
  played: TimeRanges | null,
  readyState: number | null,
  seekable: TimeRanges | null,
  seeking: boolean | null,
  textTracks: TextTrackList | null,
  volume: number,
}

export interface PlayerTooltip {
  clientX: number,
  sliderOffset: DomOffset,
  sliderWidth: number,
}

export interface PlayerRequest {
  fullscreen?: boolean,
  playback?: boolean,
  time?: number
}

export interface PlayerState {
  model: Model,
  source: string,
  properties: PlayerProperties,
  request: PlayerRequest,
}

export interface PlayerSource {
  model: Model,
  source: string | null,
}
