import { PlayerProperties, PlayerState } from 'src/interfaces/player';
import { StoreState } from 'src/interfaces/store';
import { ActionTree } from 'vuex';

const actions: ActionTree<PlayerState, StoreState> = {
  resetStore(context): void {
    context.commit('resetStore');
  },

  initialize(context): void {
    if (!context.state.ready) {
      context.commit('setId', Date.now());
      context.commit('setReady', true);
    }
  },

  setProperties(context, payload: PlayerProperties): void {
    context.commit('setProperties', payload);
  },
};

export default actions;
