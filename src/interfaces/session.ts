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
  email: string,
  password: string,
  remember: boolean,
  'device_name': string,
}

export interface AuthResponse {
  token: string,
  user: UserModel,
}
