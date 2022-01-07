export interface PlayerProperties {
  readyState: number,
  buffered: TimeRanges | undefined,
  currentTime: number,
  duration: number,
  ended: boolean,
  error: MediaError | null | undefined,
  muted: boolean,
  networkState: number,
  paused: boolean,
  seekable: TimeRanges | undefined,
  textTracks: TextTrackList | undefined,
  volume: number,
}

export interface PlayerRequest {
  pause?: boolean | number,
  seek?: number,
  fullscreen?: boolean | number,
  resolution?: boolean | number,
  // showTrack?: PlayerTrack,
  // hideTrack?: PlayerTrack,
}

export interface PlayerState {
  activity: boolean,
  controls: boolean,
  properties: PlayerProperties,
  request: PlayerRequest,
  // tooltip: PlayerTooltip,
}
