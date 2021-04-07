import { Module } from 'vuex'
import { StoreState, PaginateState } from 'src/interfaces/store'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const paginateModule: Module<PaginateState, StoreState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default paginateModule
