import { StoreState } from 'src/interfaces/store';
import { VideosState } from 'src/interfaces/video';
import { ActionTree } from 'vuex';

const actions: ActionTree<VideosState, StoreState> = {
  resetStore(context): void {
    context.commit('resetStore');
  },

  initialize(context): void {
    if (!context.state.ready) {
      context.commit('setId', Date.now());
      context.commit('setReady', true);
    }
  },

  reset(context): void {
    context.commit('resetItems');
    context.commit('resetLinks');
    context.commit('resetMeta');
    context.commit('setId', Date.now());
  },
};

export default actions;
