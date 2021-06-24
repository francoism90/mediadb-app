import defaultState from 'src/store/videos/state';
import { MutationTree } from 'vuex';
import { assign } from 'lodash';
import {
  VideoModel, VideosLinks, VideosMeta, VideosQuery, VideosState,
} from 'src/interfaces/video';

const mutation: MutationTree<VideosState> = {
  resetStore(state: VideosState) {
    Object.assign(state, defaultState());
  },

  resetData(state: VideosState) {
    state.data = <VideoModel[]>[];
  },

  resetLinks(state: VideosState) {
    state.links = <VideosLinks>{};
  },

  resetMeta(state: VideosState) {
    state.meta = <VideosMeta>{};
  },

  setId(state: VideosState, payload: string | number | null) {
    state.id = payload;
  },

  setData(state: VideosState, payload: VideoModel[]) {
    state.data = state.data.concat(payload);
  },

  setLinks(state: VideosState, payload: VideosLinks) {
    state.links = payload;
  },

  setMeta(state: VideosState, payload: VideosMeta) {
    state.meta = payload;
  },

  setQuery(state: VideosState, payload: VideosQuery) {
    state.query = assign(state.query, payload);
  },

  setReady(state: VideosState, payload: boolean) {
    state.ready = payload;
  },
};

export default mutation;
