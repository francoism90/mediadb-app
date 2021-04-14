
import { PlayerProps } from '@vime/vue-next'
import { Model, RepositoryMeta } from 'src/interfaces/repository'
import { User } from 'src/interfaces/user'

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
  name: string,
  id: number | string | null,
  autoload: boolean,
  timestamp: Date | null,
  data: Model[],
  meta: RepositoryMeta,
  options: RepositoryOption[]
}

export interface PlayerState {
  id: number | string | null,
  controls: boolean,
  fullscreen: boolean,
  playbackRate: number,
  tracks: null,
  requestTime: number | null,
  lastSync: number,
  props: PlayerProps | null
}

export interface StoreState {
  session: SessionState,
}
