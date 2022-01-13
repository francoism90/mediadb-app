import { MediaInfo } from 'dashjs';
import { DomOffset } from 'quasar';

export type PlayerTextTrack = MediaInfo | TextTrack | null

export type PlayerEvent = boolean | string | number | PlayerTextTrack

export interface PlayerProperties {
  ready: boolean,
  autoplay: boolean,
  buffered: number,
  duration: number,
  fullscreen: boolean,
  muted: boolean,
  paused: boolean,
  playbackRate: number,
  quality: number,
  seeking: boolean,
  source: string | object,
  tracks: TextTrackList,
  textTrack: PlayerTextTrack,
  textTracks: PlayerTextTrack[],
  videoTrack: PlayerTextTrack,
  videoTracks: PlayerTextTrack[],
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
  position: number,
  offset: DomOffset,
  width: number,
}

export interface PlayerTrack {
  id: string,
  kind: string,
  label: string,
  srclang: string,
  src: string,
  type: string,
}

export interface PlayerState {
  fullscreen: boolean,
  playback: boolean,
  seek: number,
  capture: number,
  properties: PlayerProperties,
  tooltip: PlayerTooltip,
}
