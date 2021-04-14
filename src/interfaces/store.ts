
import { PlayerProps } from '@vime/vue-next'
import { Model, RepositoryMeta, RepositoryParameters } from 'src/interfaces/repository'
import { User } from 'src/interfaces/user'

export interface SessionState {
  redirectPath: string | null;
  timestamp: Date | null;
  token: string | null;
  user: User;
}

export interface RepositoryState {
  ready: boolean,
  id: string,
  params: RepositoryParameters,
  data: Model[],
  meta: RepositoryMeta,
  lastFetch: Date | null,
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
