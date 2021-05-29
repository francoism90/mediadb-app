import {
  Model, RepositoryLinks, RepositoryMeta, RepositoryParams,
} from 'src/interfaces/repository';
import { RepositoryState } from 'src/interfaces/store';
import defaultState from 'src/store/repository/state';
import { assign } from 'lodash';
import { MutationTree } from 'vuex';

const mutation: MutationTree<RepositoryState> = {
  resetStore(state: RepositoryState) {
    Object.assign(state, defaultState());
  },

  resetData(state: RepositoryState) {
    state.data = <Model[]>[];
  },

  resetLinks(state: RepositoryState) {
    state.links = <RepositoryLinks>{};
  },

  resetMeta(state: RepositoryState) {
    state.meta = <RepositoryMeta>{};
  },

  resetParams(state: RepositoryState) {
    state.params = <RepositoryParams>{};
  },

  setId(state: RepositoryState, payload: string | number | null) {
    state.id = payload;
  },

  setData(state: RepositoryState, payload: Model[]) {
    state.data = state.data.concat(payload);
  },

  setLinks(state: RepositoryState, payload: RepositoryLinks) {
    state.links = payload;
  },

  setMeta(state: RepositoryState, payload: RepositoryMeta) {
    state.meta = payload;
  },

  setParams(state: RepositoryState, payload: RepositoryParams) {
    state.params = assign(state.params, payload);
  },

  setReady(state: RepositoryState, payload: boolean) {
    state.ready = payload;
  },
};

export default mutation;
