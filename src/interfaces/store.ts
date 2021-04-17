import { Media } from 'src/interfaces/media'
import { StreamInfo } from 'src/interfaces/player'
import { Model, RepositoryMeta, RepositoryParams } from 'src/interfaces/repository'
import { User } from 'src/interfaces/user'

export interface SessionState {
  redirectPath: string | null;
  timestamp: Date | null;
  token: string | null;
  user: User;
}

export interface RepositoryState {
  ready: boolean,
  id: string | number | null,
  params: RepositoryParams,
  data: Model[],
  meta: RepositoryMeta,
}

export interface PlayerState {
  controls: boolean,
  fullscreen: boolean,
  playbackRate: number,
  tracks: Media[],
  requestTime: number | null,
  stream: StreamInfo | null
  media: Media | null
  model: Model | null
}

export interface StoreState {
  session: SessionState,
  videos: RepositoryState
}
