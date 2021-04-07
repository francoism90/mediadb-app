import { Model, RepositoryMeta, RepositoryOption } from './repository'
import { User } from './user'

export interface SessionState {
  redirectPath: string | null;
  timestamp: Date | null;
  token: string | null;
  user: User;
}

export interface RepositoryState {
  id: number | string | null,
  ready: boolean,
  data: Model[] | null,
  meta: RepositoryMeta | null,
  options?: RepositoryOption[] | null
}

export interface StoreState {
  session: SessionState,
  videos: RepositoryState
}
