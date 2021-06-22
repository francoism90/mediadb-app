import defaultState from 'src/store/videos/state';
import { MutationTree } from 'vuex';
import {
  VideoModel, VideosLinks, VideosMeta, VideosState,
} from 'src/interfaces/video';

const mutation: MutationTree<VideosState> = {
  resetStore(state: VideosState) {
    Object.assign(state, defaultState());
  },

  resetData(state: VideosState) {
    state.items = <VideoModel[]>[];
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

  setItems(state: VideosState, payload: VideoModel[]) {
    state.items = state.items.concat(payload);
  },

  setLinks(state: VideosState, payload: VideosLinks) {
    state.links = payload;
  },

  setMeta(state: VideosState, payload: VideosMeta) {
    state.meta = payload;
  },

  setReady(state: VideosState, payload: boolean) {
    state.ready = payload;
  },
};

export default mutation;
