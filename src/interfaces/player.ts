import { Event, MediaInfo } from 'dashjs';
import { DomOffset } from 'quasar';

export type PlayerTextTrack = MediaInfo | TextTrack | null

export type PlayerEvent = Event | TextTrack | null

export interface PlayerState {
  ready: boolean | undefined,
  buffered: number | undefined,
  duration: number | undefined,
  fullscreen: boolean | undefined,
  muted: boolean | undefined,
  paused: boolean | undefined,
  playbackRate: number | undefined,
  quality: number | undefined,
  seeking: boolean | undefined,
  time: number | undefined,
  tracks: TextTrackList | undefined,
  volume: number | undefined,
  textTrack: PlayerTextTrack | undefined,
  textTracks: PlayerTextTrack[] | undefined,
  videoTrack: PlayerTextTrack | undefined,
  videoTracks: PlayerTextTrack[] | undefined,
}

export interface PlayerResolution {
  label: string,
  icon: string,
  width: number,
  height: number,
}

export interface PlayerFrame {
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
