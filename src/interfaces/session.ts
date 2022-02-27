import { UserModel } from 'src/interfaces';

export interface AuthResponse {
  token: string,
  user: UserModel,
}

export interface SessionState {
  redirectUri: string,
  timestamp: number,
  token: string,
  user: UserModel,
}

export interface AuthRequest {
  redirectUri?: string,
}

export interface LoginRequest {
  'device_name': string,
  email: string,
  password: string,
  remember: boolean,
}
