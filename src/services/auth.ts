import { api } from 'boot/axios'
import { AxiosResponse } from 'axios'
import { CsrfCookie, PostLoginForm } from 'src/interfaces/session'
import { UserResponse } from 'src/interfaces/response'

export async function setCsrfCookie (): Promise<CsrfCookie> {
  const response = await api.get<CsrfCookie, AxiosResponse<CsrfCookie>>('sanctum/csrf-cookie')

  return response.data
}

export async function getUser (): Promise<UserResponse> {
  const response = await api.get<UserResponse, AxiosResponse<UserResponse>>('auth/user')

  return response.data
}

export async function loginUser (form: PostLoginForm): Promise<UserResponse> {
  const response = await api.post<UserResponse, AxiosResponse<UserResponse>>('auth/login', {
    email: form.email,
    password: form.password,
    device_name: form.deviceName,
    remember_me: form.remember
  })

  return response.data
}
