import { Media } from 'src/interfaces/media'
import { Model } from 'src/interfaces/repository'

export interface PlayerProps {
  module: string,
  media?: Media,
  model?: Model,
}

export interface StreamInfo {
  buffered: TimeRanges | null,
  buffering: boolean,
  currentTime: number | undefined,
  duration: number | undefined,
  paused: boolean,
  playable: boolean,
  playbackRate: number | null,
  playbackReady: boolean,
  playing: boolean,
  ready: boolean,
  seeking: boolean,
  textTracks: TextTrack[] | null,
  volume: number | null,
}
