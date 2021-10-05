import { mergeWith } from 'lodash';
import { defineStore } from 'pinia';
import { TagModel, TagsLinks, TagsMeta, TagsQuery, TagsResponse, TagsState } from 'src/interfaces/tag';
import { mergeDeep } from 'src/utils/helpers';

export const useStore = defineStore('tags', {
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
    links: <TagsLinks>{},
  }),

  getters: {
    isQueryable(): boolean {
      return !this.links.first && !this.links.next;
    },

    isFetchable(): boolean {
      return typeof this.links.next === 'string';
    },
  },

  actions: {
    reset(payload?: TagsQuery): void {
      this.query = mergeWith(this.query, payload || {}, mergeDeep);
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
