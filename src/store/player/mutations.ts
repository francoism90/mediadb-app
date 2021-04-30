import { Media } from 'src/interfaces/media';
import { PlayerProperties } from 'src/interfaces/player';
import { Model } from 'src/interfaces/repository';
import { PlayerState } from 'src/interfaces/store';
import defaultState from 'src/store/player/state';
import { MutationTree } from 'vuex';

const mutation: MutationTree<PlayerState> = {
  resetStore(state: PlayerState) {
    Object.assign(state, defaultState());
  },

  setMedia(state: PlayerState, payload: Media) {
    state.media = Object.assign(state.media, payload);
  },

  setModel(state: PlayerState, payload: Model) {
    state.model = Object.assign(state.model, payload);
  },

  setProperties(state: PlayerState, payload: PlayerProperties) {
    const currentProps = state.properties;
    const finalProps = { ...currentProps, ...payload };

    state.properties = { ...state.properties, ...finalProps };
  },
};

export default mutation;
