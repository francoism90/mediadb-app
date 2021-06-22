import { SessionState } from 'src/interfaces/session';
import { StoreState } from 'src/interfaces/store';
import actions from 'src/store/session/actions';
import getters from 'src/store/session/getters';
import mutations from 'src/store/session/mutations';
import state from 'src/store/session/state';
import { Module } from 'vuex';

const sessionModule: Module<SessionState, StoreState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default sessionModule;
