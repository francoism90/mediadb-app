import { RepositoryParameters, RepositoryProps, RepositoryResponse } from 'src/interfaces/repository';
import { RepositoryState, StoreState } from 'src/interfaces/store';
import { ActionTree } from 'vuex';

const actions: ActionTree<RepositoryState, StoreState> = {
  resetStore(context): void {
    context.commit('resetStore');
  },

  initialize(context, payload: RepositoryProps): void {
    if (!context.state.ready) {
      context.commit('setId', Date.now());
      context.commit('setParams', payload.params);
      context.commit('setReady', true);
    }
  },

  setParams(context, payload: RepositoryParameters): void {
    context.commit('setParams', payload.params || []);

    if (payload.reset) {
      context.commit('resetData');
      context.commit('resetLinks');
      context.commit('resetMeta');
      context.commit('setId', Date.now());
    }
  },

  setResponse(context, payload: RepositoryResponse): void {
    context.commit('setData', payload.data);
    context.commit('setLinks', payload.links);
    context.commit('setMeta', payload.meta);
  },
};

export default actions;
