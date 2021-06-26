import { VideoModel } from 'src/interfaces/video';

export interface PlayerProperties {
  buffered: TimeRanges | null,
  currentSrc: string | null,
  currentTime: number | null,
  duration: number | null,
  ended: boolean | null,
  error: string | null,
  fullscreen: boolean,
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
  cue: VTTCue | null,
  position: number,
  time: number,
}

export interface PlayerRequest {
  controls?: boolean,
  fullscreen?: boolean,
  playback?: boolean,
  rate?: number,
  time?: number,
}

export interface PlayerState {
  id: string | number | null,
  source: string | null,
  // audio?: AudioModel,
  video?: VideoModel,
  controls: boolean,
  properties: PlayerProperties,
}

export interface PlayerVideo {
  dom: HTMLMediaElement | null,
  model: VideoModel,
  source: string | undefined | null,
}
