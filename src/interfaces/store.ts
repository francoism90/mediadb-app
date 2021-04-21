import { Media } from 'src/interfaces/media'
import { PlayerRequest, StreamInfo } from 'src/interfaces/player'
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
  request: PlayerRequest | null,
  media: Media | null
  model: Model | null
  stream: StreamInfo | null
}

export interface StoreState {
  session: SessionState,
  videos: RepositoryState
}
