import { MediaInfo } from 'dashjs';
import { DomOffset } from 'quasar';

export interface PlayerProperties {
  ready: boolean,
  controls: boolean,
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

export interface PlayerThumbnail {
  seekerPosition: number,
  seekerOffset: DomOffset,
  seekerWidth: number,
}

export interface PlayerTrack {
  id?: string,
  name?: string,
  type?: string,
  url?: string,
}

export interface PlayerRequest {
  activity?: boolean,
  pause?: boolean,
  seek?: number,
  fullscreen?: boolean,
  resolution?: boolean,
  showTrack?: PlayerTrack,
  hideTrack?: PlayerTrack,
}

export interface PlayerState {
  properties: PlayerProperties,
  requests: PlayerRequest[],
  thumbnail: PlayerThumbnail,
}
