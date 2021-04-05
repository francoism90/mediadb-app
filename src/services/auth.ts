import { api } from 'boot/axios'
import { AxiosResponse } from 'axios'
import { CsrfCookie, PostLoginForm, Profile } from 'src/interfaces/session'
import { Store } from 'vuex'
import { StoreState } from 'src/interfaces/store'
import { FormResponse } from 'src/interfaces/form'

export async function getUser (): Promise<Profile> {
  const response = await api.get<Profile, AxiosResponse<Profile>>('auth/user')

  return response.data
}

export async function setCsrfCookie (): Promise<CsrfCookie> {
  const response = await api.get<CsrfCookie, AxiosResponse<CsrfCookie>>('sanctum/csrf-cookie')

  return response.data
}

export async function loggedIn (store: Store<StoreState>): Promise<boolean> {
  try {
    const sessionToken = store.state.session.token

    if (!sessionToken || sessionToken.length === 0) {
      throw Error('Invalid auth-token given')
    }

    // Returns 401 when token is invalid
    const user = await getUser()

    await store.dispatch('session/setUser', user)

    return true
  } catch {
    await store.dispatch('session/reset')

    return false
  }
}

export async function loginUser (form: PostLoginForm): Promise<FormResponse> {
  const response = await api.post<FormResponse, AxiosResponse<FormResponse>>('auth/login', {
    email: form.email,
    password: form.password,
    device_name: form.deviceName,
    remember_me: form.remember
  })

  console.log(response)

  return response.data
}

export function getAuthToken (store: Store<StoreState>): string | null {
  return store.state.session.token
}
