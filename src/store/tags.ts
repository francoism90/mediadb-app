import { merge } from 'lodash';
import { defineStore } from 'pinia';
import {
  TagModel, TagsLinks, TagsMeta, TagsQuery, TagsResponse, TagsState,
} from 'src/interfaces/tag';

export const useTagsStore = defineStore({
  id: 'tags',

  state: () => (<TagsState>{
    id: null,
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
    firstLoad(): boolean {
      return (this.links.first === null && this.links.next === null);
    },

    isLoadable(): boolean {
      return (this.links.first !== null && this.links.next !== null);
    },

    isDone(): boolean {
      return this.links.next === null;
    },
  },

  actions: {
    reset(payload: TagsQuery): void {
      this.query = merge(this.query, payload);
      this.reload();
    },

    reload(): void {
      this.data = <TagModel[]>[];
      this.meta = <TagsMeta>{};
      this.links = <TagsLinks>{ first: null, next: null };
      this.id = Date.now();
    },

    populate(payload: TagsResponse): void {
      this.data = this.data.concat(payload.data);
      this.links = payload.links;
      this.meta = payload.meta;
    },
  },
});
