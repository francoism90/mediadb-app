import { PlayerStatus } from './player'
import { Model, RepositoryMeta } from './repository'
import { User } from './user'

export interface SessionState {
  redirectPath: string | null;
  timestamp: Date | null;
  token: string | null;
  user: User;
}

export interface RepositoryOption {
  [key: string]: string | number | null
}

export interface RepositoryState {
  id: number | string | null,
  data: Model[] | null,
  meta: RepositoryMeta | null,
  options: RepositoryOption[] | null
}
export interface PlayerState {
  id: number | string | null,
  controls: boolean,
  fullscreen: boolean,
  playbackRate: number,
  tracks: null,
  requestTime: number | null,
  lastSync: number,
  status: PlayerStatus
}

export interface StoreState {
  session: SessionState,
}
