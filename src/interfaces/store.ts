import { Profile } from './session'

export interface SessionState {
  timestamp: Date | null;
  token: string | null;
  user: Profile;
}

export interface StoreState {
  session: SessionState;
}
