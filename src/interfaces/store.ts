import { BaseModel, UserModel } from './model'
import { RepositoryMeta, RepositoryOption } from './repository'

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
  options?: RepositoryOption[] | null
}

export interface StoreState {
  session: SessionState;
}
