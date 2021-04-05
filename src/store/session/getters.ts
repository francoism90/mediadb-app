import { GetterTree } from 'vuex'
import { StoreState, SessionState } from 'src/interfaces/store'

const getters: GetterTree<SessionState, StoreState> = {
  getTimestampDiff (state: SessionState): number {
    const currentDate = Date.now()
    const lastDate = state.timestamp?.valueOf() || currentDate

    console.log(currentDate)
    console.log(lastDate)

    return Math.abs((lastDate - currentDate) / 1000)
  },

  loggedIn (state: SessionState): boolean {
    if (!state.token || state.token.length === 0) {
      return false
    }

    return true
  }
}

export default getters
