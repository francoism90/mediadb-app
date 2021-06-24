import { UserModel } from 'src/interfaces/user';

export interface SessionState {
  redirectUri: string | null,
  timestamp: number | null,
  token: string | null,
  user: UserModel | null,
}

export interface CsrfCookie {
  message: string | null,
}

export interface AuthUser {
  token: string,
}

export interface LoginUser {
  email: string,
  password: string,
  'device_name': string,
  'remember_me': boolean,
}

export interface AuthResponse {
  token: string | null,
  user: UserModel | null,
}
