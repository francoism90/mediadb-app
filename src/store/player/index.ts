import { PlayerState } from 'src/interfaces/player';
import { StoreState } from 'src/interfaces/store';
import actions from 'src/store/player/actions';
import getters from 'src/store/player/getters';
import mutations from 'src/store/player/mutations';
import state from 'src/store/player/state';
import { Module } from 'vuex';

const playerModule: Module<PlayerState, StoreState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default playerModule;
