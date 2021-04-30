import { PlayerProperties, PlayerProps } from 'src/interfaces/player';
import { PlayerState, StoreState } from 'src/interfaces/store';
import { ActionTree } from 'vuex';

const actions: ActionTree<PlayerState, StoreState> = {
  resetStore(context): void {
    context.commit('resetStore');
  },

  initialize(context, payload: PlayerProps): void {
    context.commit('setMedia', payload.media);
    context.commit('setModel', payload.model);
  },

  setProperties(context, payload: PlayerProperties): void {
    context.commit('setProperties', payload);
  },
};

export default actions;
