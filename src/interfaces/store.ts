import { User } from './user'

export interface SessionState {
  redirectPath: string | null;
  timestamp: Date | null;
  token: string | null;
  user: User;
}

export interface StoreState {
  session: SessionState;
}
