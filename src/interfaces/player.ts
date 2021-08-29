import { DomOffset } from 'quasar';
import { MediaModel } from 'src/interfaces/media';

export interface PlayerTooltip {
  clientX: number,
  sliderOffset: DomOffset,
  sliderWidth: number,
}

export interface PlayerRequest {
  fullscreen?: number,
  playback?: boolean,
  time?: number
}

export interface PlayerSource {
  media: MediaModel | undefined,
  'live_url'?: string,
  'vod_url'?: string,
}

export interface PlayerState {
  properties: HTMLVideoElement,
  request: PlayerRequest,
  source: PlayerSource,
  tooltip: PlayerTooltip,
}
