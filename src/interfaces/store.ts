import { BaseModel, UserModel } from './model'
import { PaginateFilter, PaginateMeta } from './paginate'

export interface SessionState {
  redirectPath: string | null;
  timestamp: Date | null;
  token: string | null;
  user: UserModel;
}

export interface PaginateState {
  id: number | string | null,
  ready: boolean,
  data: BaseModel[] | null,
  meta: PaginateMeta | null,
  filters?: PaginateFilter[] | null
}

export interface StoreState {
  session: SessionState;
}
