export interface PlayerStatus {
  buffered: Buffer | null,
  currentTime: number,
  duration: number,
  paused: boolean,
  playable: boolean,
  playing: boolean,
  waiting: boolean,
}
