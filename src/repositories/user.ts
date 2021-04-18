import { AxiosResponse } from 'axios'
import { api } from 'boot/axios'
import { AuthResponse, LoginUser } from 'src/interfaces/session'
import { UserResponse } from 'src/interfaces/user'

export async function authUser (): Promise<UserResponse> {
  const response = await api.get<UserResponse, AxiosResponse<UserResponse>>('auth/user')

  return response.data
}

export async function loginUser (form: LoginUser): Promise<AuthResponse> {
  const response = await api.post<AuthResponse, AxiosResponse<AuthResponse>>('auth/login', {
    email: form.email,
    password: form.password,
    device_name: form.deviceName,
    remember_me: form.remember
  })

  return response.data
}
