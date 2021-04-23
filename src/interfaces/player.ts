import { Media } from 'src/interfaces/media'
import { Model } from 'src/interfaces/repository'

export interface PlayerProps {
  module: string,
  media?: Media,
  model?: Model,
}

export interface StreamInfo {
  buffered: TimeRanges | null,
  currentSrc: string | null,
  currentTime: number | undefined,
  duration: number | undefined,
  ended: boolean,
  error: string | null,
  muted: boolean,
  networkState: number,
  paused: boolean,
  playbackRate: number | null,
  played: TimeRanges | undefined,
  poster: string | null,
  readyState: number | null,
  seekable: TimeRanges | undefined,
  seeking: boolean,
  textTracks: TextTrack[] | null,
  volume: number | null,
}

export interface PlayerRequest {
  controls?: boolean,
  currentTime?: number,
  fullscreen?: boolean,
  pause?: boolean,
  playbackRate?: number,
  tracks?: Media[],
}
