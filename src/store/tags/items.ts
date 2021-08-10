import { merge } from 'lodash';
import { defineStore } from 'pinia';
import {
  TagModel, TagsLinks, TagsMeta, TagsQuery, TagsResponse, TagsState,
} from 'src/interfaces/tag';

export const useStore = defineStore({
  id: 'tags',

  state: () => (<TagsState>{
    id: Date.now(),
    query: <TagsQuery>{
      append: ['items'],
      sort: 'name',
      filter: {
        type: null,
        query: null,
      },
      page: {
        number: 1,
        size: 24,
      },
    },
    data: <TagModel[]>[],
    meta: <TagsMeta>{},
    links: <TagsLinks>{
      first: null,
      next: null,
    },
  }),

  getters: {
    isQueryable(): boolean {
      return (this.links.first === null && this.links.next === null);
    },

    isFetchable(): boolean {
      return this.links.next !== null;
    },
  },

  actions: {
    reset(payload?: TagsQuery): void {
      this.$patch({
        query: merge(this.query, payload || {}),
        data: [],
        meta: {},
        links: {},
      });

      this.id = Date.now();
    },

    populate(payload: TagsResponse): void {
      this.$patch({
        data: this.data.concat(payload.data),
        links: payload.links,
        meta: payload.meta,
      });
    },
  },
});
