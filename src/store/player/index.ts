import { Module } from 'vuex'
import { StoreState, PlayerState } from 'src/interfaces/store'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const playerModule: Module<PlayerState, StoreState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default playerModule
