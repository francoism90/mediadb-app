import { UserModel } from 'src/interfaces/model'
import { SessionState } from 'src/interfaces/store'

function state (): SessionState {
  return {
    redirectPath: null,
    timestamp: null,
    token: null,
    user: <UserModel>{}
  }
}

export default state
