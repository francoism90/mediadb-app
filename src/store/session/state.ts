import { User } from 'src/interfaces/user'
import { SessionState } from 'src/interfaces/store'

function state (): SessionState {
  return {
    redirectPath: null,
    timestamp: null,
    token: null,
    user: <User>{}
  }
}

export default state
