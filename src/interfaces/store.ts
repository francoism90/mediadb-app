import { User } from './user'

export interface SessionState {
  timestamp: Date | null;
  token: string | null;
  user: User;
}

export interface StoreState {
  session: SessionState;
}
