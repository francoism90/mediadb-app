import { find, findIndex, mergeWith, remove } from 'lodash';
import { defineStore } from 'pinia';
import { mergeDeep } from 'src/helpers';
import { RepositoryLinks, RepositoryMeta, RepositoryResponse, TagModel, TagsParams, TagsState } from 'src/interfaces';

export const useStore = defineStore('tags', {
  state: () => (<TagsState>{
    id: Date.now(),
    data: <TagModel[]>[],
    meta: <RepositoryMeta>{},
    links: <RepositoryLinks>{},
    params: <TagsParams>{
      sort: null,
      type: null,
      query: null,
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
    reset(payload?: TagsParams): void {
      // Merge query
      this.$patch({ params: payload || {} });

      // Reset results
      this.data = <TagModel[]>[];
      this.meta = <RepositoryMeta>{};
      this.links = <RepositoryLinks>{};
      this.id = Date.now();
    },

    populate(payload: RepositoryResponse): void {
      this.data = this.data.concat(payload.data);
      this.meta = payload.meta;
      this.links = payload.links;
    },

    delete(payload: TagModel): void {
      remove(this.data, { id: payload.id });
    },

    update(payload: TagModel): void {
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
