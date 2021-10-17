import { merge } from 'lodash';
import { defineStore } from 'pinia';
import { TagModel, TagsLinks, TagsMeta, TagsQuery, TagsResponse, TagsState } from 'src/interfaces/tag';

export const useStore = defineStore('tag-select', {
  state: () => (<TagsState>{
    id: Date.now(),
    loading: false,
    query: <TagsQuery>{
      append: ['items'],
      sort: 'random',
      filter: {
        type: null,
        query: null,
      },
      page: {
        number: 1,
        size: 5,
      },
    },
    data: <TagModel[]>[],
    meta: <TagsMeta>{},
    links: <TagsLinks>{},
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
    reset(payload?: TagsQuery): void {
      this.query = merge(this.query, payload || {});
      this.data = <TagModel[]>[];
      this.meta = <TagsMeta>{};
      this.links = <TagsLinks>{};
      this.id = Date.now();
    },

    populate(payload: TagsResponse): void {
      this.data = this.data.concat(payload.data);
      this.meta = payload.meta;
      this.links = payload.links;
    },
  },
});
