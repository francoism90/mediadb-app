import { UserModel } from 'src/interfaces/user';

export interface SessionState {
  redirectUri: string | null,
  timestamp: number | null,
  token: string | null,
  user: UserModel,
}

export interface AuthUser {
  redirectUri?: string | null,
  token?: string | null,
}

export interface LoginUser {
  'device_name': string,
  email: string,
  password: string,
  remember: boolean,
}

export interface AuthResponse {
  token: string,
  user: UserModel,
}
