import { VideoModel } from 'components/App/Views/Video';
import { QueryResponse } from 'components/App/Views/Videos';
import { find, findIndex, mergeWith, remove } from 'lodash';
import { defineStore } from 'pinia';
import { PaginateLinks, PaginateMeta, PaginateQuery } from 'components/UIComponents/Paginations';
import { mergeDeep } from 'src/utils/helpers';

export interface StoreState {
  id: string | number | null,
  query: PaginateQuery,
  data: VideoModel[],
  meta: PaginateMeta,
  links: PaginateLinks,
}

export const useStore = defineStore('videos', {
  state: () => (<StoreState>{
    id: Date.now(),
    data: <VideoModel[]>[],
    meta: <PaginateMeta>{},
    links: <PaginateLinks>{},
    query: <PaginateQuery>{
      append: ['poster_url'],
      sort: 'relevance',
      filter: {
        type: null,
        tags: null,
        query: null,
      },
      page: {
        number: 1,
        size: 24,
      },
    },
  }),

  getters: {
    isQueryable(): boolean {
      return !this.links?.first && !this.links?.next;
    },

    isFetchable(): boolean {
      return typeof this.links?.next === 'string';
    },
  },

  actions: {
    reset(payload?: PaginateQuery): void {
      // Merge query (if given)
      this.$patch({ query: payload || {} });

      // Reset results
      this.data = <VideoModel[]>[];
      this.meta = <PaginateMeta>{};
      this.links = <PaginateLinks>{};
      this.id = Date.now();
    },

    populate(payload: QueryResponse): void {
      this.data = this.data.concat(payload.data);
      this.meta = payload.meta;
      this.links = payload.links;
    },

    delete(payload: VideoModel): void {
      remove(this.data, { id: payload.id });
    },

    update(payload: VideoModel): void {
      const index = findIndex(this.data, { id: payload.id });

      if (index >= 0) {
        const model = find(this.data, { id: payload.id });
        const object = mergeWith(model, payload, mergeDeep);

        this.data.splice(index, 1, object);
      }
    },
  },

  debounce: {
    delete: 50,
    update: 50,
  },
});
