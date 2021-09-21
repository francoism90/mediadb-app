import { MediaInfo } from 'dashjs';
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
  tracks: TextTrackList,
  textTrack: MediaInfo | null,
  textTracks: MediaInfo[] | null,
  videoTrack: MediaInfo | null,
  videoTracks: MediaInfo[] | null,
  time: number,
  volume: number,
}

export interface PlayerResolution {
  label: string,
  icon: string,
  width: number,
  height: number,
}

export interface PlayerTooltip {
  clientX: number,
  sliderOffset: DomOffset,
  sliderWidth: number,
}

export interface PlayerThumbnail {
  type: string,
  url: string,
}

export interface PlayerState {
  model: VideoModel,
  controls: boolean,
  fullscreen: boolean,
  pause: boolean,
  time: number,
  properties: PlayerProperties,
  tooltip: PlayerTooltip,
}
