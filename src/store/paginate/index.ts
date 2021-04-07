import { Module } from 'vuex'
import { StoreState, SessionState } from 'src/interfaces/store'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const sessionModule: Module<SessionState, StoreState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default sessionModule
