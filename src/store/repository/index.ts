import { RepositoryState, StoreState } from 'src/interfaces/store';
import actions from 'src/store/repository/actions';
import getters from 'src/store/repository/getters';
import mutations from 'src/store/repository/mutations';
import state from 'src/store/repository/state';
import { Module } from 'vuex';

const repositoryModule: Module<RepositoryState, StoreState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default repositoryModule;
