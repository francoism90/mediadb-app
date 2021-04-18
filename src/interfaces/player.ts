import { Media } from 'src/interfaces/media'
import { Model } from 'src/interfaces/repository'

export interface PlayerProps {
  module: string,
  media?: Media,
  model?: Model,
}

export interface StreamInfo {
  buffered?: TimeRanges | null,
  currentSrc?: string | null,
  currentTime?: number | undefined,
  duration?: number | undefined,
  ended?: boolean,
  error?: string | null,
  muted?: boolean,
  networkState?: number,
  paused?: boolean,
  playbackRate?: number | null,
  played?: TimeRanges,
  poster?: string | null,
  readyState?: number | null,
  seekable?: TimeRanges,
  seeking?: boolean,
  textTracks?: TextTrack[] | null,
  volume?: number | null,
}

export interface PlayerRequest {
  controls?: boolean | null,
  currentTime?: number | null,
  fullscreen?: boolean | null,
  pause?: boolean | null,
  playbackRate?: number | null,
  tracks?: Media[],
}
