import { PlayerState, StoreState } from 'src/interfaces/store';
import { GetterTree } from 'vuex';

const getters: GetterTree<PlayerState, StoreState> = {
  isLoading(state: PlayerState): boolean {
    return (!state.properties.ended && state.properties.readyState < 3);
  },
};

export default getters;
