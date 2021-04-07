import { Module } from 'vuex'
import { StoreState, RepositoryState } from 'src/interfaces/store'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const repositoryModule: Module<RepositoryState, StoreState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default repositoryModule
