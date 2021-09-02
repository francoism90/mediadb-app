import { DomOffset } from 'quasar';
import { VideoModel } from 'src/interfaces/video';

export interface PlayerProperties {
  ready: boolean,
  autoplay: boolean,
  buffered: number,
  duration: number,
  muted: boolean,
  paused: boolean,
  playbackRate: number,
  quality: number,
  seeking: boolean,
  time: number,
  volume: number,
}

export interface PlayerTooltip {
  clientX: number,
  sliderOffset: DomOffset,
  sliderWidth: number,
}

export interface PlayerState {
  model: VideoModel,
  requestFullscreen: boolean,
  requestPause: boolean,
  requestTime: number,
  properties: PlayerProperties,
  tooltip: PlayerTooltip,
}
