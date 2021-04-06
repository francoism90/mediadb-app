import { GetterTree } from 'vuex'
import { StoreState, SessionState } from 'src/interfaces/store'

const getters: GetterTree<SessionState, StoreState> = {
  getTimestampDiff (state: SessionState): number {
    const currentDate = Date.now()
    const lastDate = state.timestamp?.valueOf() || currentDate

    return Math.abs((lastDate - currentDate) / 1000)
  },

  redirectPath (state: SessionState): string {
    if (!state.redirectPath || state.redirectPath.length === 0) {
      return '/'
    }

    return state.redirectPath
  }
}

export default getters
