import { BaseModel, UserModel } from './model'
import { RepositoryFilter, RepositoryMeta } from './repository'

export interface SessionState {
  redirectPath: string | null;
  timestamp: Date | null;
  token: string | null;
  user: UserModel;
}

export interface RepositoryState {
  id: number | string | null,
  ready: boolean,
  data: BaseModel[] | null,
  meta: RepositoryMeta | null,
  filters?: RepositoryFilter[] | null
}

export interface StoreState {
  session: SessionState;
}
