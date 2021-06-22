import { StoreState } from 'src/interfaces/store';
import { VideosState } from 'src/interfaces/video';
import { GetterTree } from 'vuex';

const getters: GetterTree<VideosState, StoreState> = {
  isLoadable(state: VideosState): boolean {
    if (state.links.first && !state.links.next) {
      return false;
    }

    return true;
  },

  nextPage(state: VideosState): number {
    const currentPage = state.meta.current_page || 0;
    return currentPage + 1;
  },
};

export default getters;
