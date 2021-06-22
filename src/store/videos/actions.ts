import { StoreState } from 'src/interfaces/store';
import { VideosResponse, VideosState } from 'src/interfaces/video';
import { ActionTree } from 'vuex';

const actions: ActionTree<VideosState, StoreState> = {
  reset(context): void {
    context.commit('resetStore');
  },

  initialize(context): void {
    if (!context.state.ready) {
      context.commit('setId', Date.now());
      context.commit('setReady', true);
    }
  },

  populate(context, payload: VideosResponse): void {
    context.commit('setItems', payload.data);
    context.commit('setLinks', payload.links);
    context.commit('setMeta', payload.meta);
  },

  repopulate(context): void {
    context.commit('resetItems');
    context.commit('resetLinks');
    context.commit('resetMeta');
    context.commit('setId', Date.now());
  },
};

export default actions;
