import { PlayerProperties, PlayerState } from 'src/interfaces/player';
import { VideoModel } from 'src/interfaces/video';
import defaultState from 'src/store/player/state';
import { MutationTree } from 'vuex';

const mutation: MutationTree<PlayerState> = {
  resetStore(state: PlayerState) {
    Object.assign(state, defaultState());
  },

  setVideo(state: PlayerState, payload: VideoModel) {
    state.video = Object.assign(state.video, payload);
  },

  setProperties(state: PlayerState, payload: PlayerProperties) {
    const propValue = { ...state.properties, ...payload };
    state.properties = { ...state.properties, ...propValue };
  },
};

export default mutation;
