import { MediaInfo } from 'dashjs';
import { DomOffset } from 'quasar';

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

export interface PlayerSource {
  id?: string,
  name?: string,
  url: string | undefined,
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
  module: string,
  properties: PlayerProperties,
  source: PlayerSource,
  tooltip: PlayerTooltip,
  activity: boolean,
  controls: boolean,
  fullscreen: boolean,
  pause: boolean,
  time: number,
}
