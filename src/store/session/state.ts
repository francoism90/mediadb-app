import { SessionState } from 'src/interfaces/store'
import { Profile } from 'src/interfaces/session'

function state (): SessionState {
  return {
    timestamp: null,
    token: null,
    user: <Profile>{}
  }
}

export default state
