export interface CsrfCookie {
  message?: string
}

export interface PostLoginForm {
  email: string,
  password: string,
  deviceName: string,
  remember: boolean
}

export interface AuthResponse {
  token?: string
}
