import { RepositoryParams } from 'src/interfaces/repository';
import { RepositoryState, StoreState } from 'src/interfaces/store';
import { GetterTree } from 'vuex';

const getters: GetterTree<RepositoryState, StoreState> = {
  isLoadable(state: RepositoryState): boolean {
    if (state.links.first && !state.links.next) {
      return false;
    }

    return true;
  },

  getParams(state: RepositoryState): RepositoryParams {
    return state.params;
  },

  nextPage(state: RepositoryState): number {
    const currentPage = state.meta.current_page || 0;

    return currentPage + 1;
  },
};

export default getters;
