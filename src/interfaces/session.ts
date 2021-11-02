import { UserModel } from 'src/interfaces';

export interface SessionState {
  redirectUri: string,
  timestamp: number,
  token: string,
  user: UserModel,
}

export interface AuthRequest {
  redirectUri?: string,
  token?: string,
}

export interface LoginRequest {
  'device_name': string,
  email: string,
  password: string,
  remember: boolean,
}

export interface AuthResponse {
  redirectUri: string,
  token: string,
  user: UserModel,
}
