import { MediaInfo } from 'dashjs';
import { DomOffset } from 'quasar';

export type PlayerTextTrack = MediaInfo | TextTrack | undefined

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

export interface PlayerSource {
  id?: string,
  name?: string,
  url: string | undefined,
}

export interface PlayerTooltip {
  position: number,
  offset: DomOffset,
  width: number,
}

export interface PlayerTrack {
  id?: string,
  name?: string,
  type?: string,
  url?: string,
}

export interface PlayerRequest {
  pause?: boolean,
  seek?: number,
  fullscreen?: boolean,
  resolution?: boolean,
  showTrack?: PlayerTrack,
  hideTrack?: PlayerTrack,
}

export interface PlayerState {
  activity: boolean,
  controls: boolean,
  properties: PlayerProperties,
  request: PlayerRequest,
  tooltip: PlayerTooltip,
}
