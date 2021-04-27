import { Media } from 'src/interfaces/media'
import { Model } from 'src/interfaces/repository'

export interface PlayerProps {
  module: string,
  media?: Media,
  model?: Model,
}

export interface PlayerProperties {
  buffered: TimeRanges | null,
  controls: boolean,
  currentSrc: string,
  currentTime: number,
  duration: number,
  ended: boolean,
  error: string | null,
  fullscreen: boolean,
  muted: boolean,
  networkState: number,
  paused: boolean,
  playbackRate: number,
  played: TimeRanges | null,
  readyState: number,
  requestTime: number,
  seekable: TimeRanges | null,
  seeking: boolean,
  textTracks: TextTrackList | null,
  volume: number,
}

export interface TextTrackCueThumbnail {
  start: string,
  end: string,
  url: string,
}

export interface TextTrackCue {
  time?: string | number,
  thumbnail?: TextTrackCueThumbnail | null
}
