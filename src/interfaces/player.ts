import { Media } from 'src/interfaces/media'
import { Model } from 'src/interfaces/repository'

export interface PlayerProps {
  module: string,
  media?: Media,
  model?: Model,
}

export interface PlayerProperties {
  autoplay: boolean,
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
  seekable: TimeRanges | null,
  seeking: boolean,
  textTracks: TextTrack[] | null,
  volume: number,
}
