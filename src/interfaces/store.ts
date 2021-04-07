import { PaginateFilter, PaginateEntity, PaginateMeta } from './paginate'
import { User } from './user'

export interface SessionState {
  redirectPath: string | null;
  timestamp: Date | null;
  token: string | null;
  user: User;
}

export interface PaginateState {
  id: number | string | null,
  ready: boolean,
  data: PaginateEntity[],
  meta: PaginateMeta,
  filters?: PaginateFilter[]
}

export interface StoreState {
  session: SessionState;
}
