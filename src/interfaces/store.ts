import { Media } from 'src/interfaces/media'
import { PlayerProperties } from 'src/interfaces/player'
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
  media: Media,
  model: Model,
  properties: PlayerProperties,
}

export interface StoreState {
  session: SessionState,
  videos: RepositoryState,
}
