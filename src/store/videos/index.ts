import { StoreState } from 'src/interfaces/store';
import { VideosState } from 'src/interfaces/video';
import actions from 'src/store/videos/actions';
import getters from 'src/store/videos/getters';
import mutations from 'src/store/videos/mutations';
import state from 'src/store/videos/state';
import { Module } from 'vuex';

const videosModule: Module<VideosState, StoreState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default videosModule;
