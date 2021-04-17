export interface PlayerProps {
  module: string,
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
  type: 'video' | 'audio' | 'text',
  volume: number | null,
}
