import { find, findIndex, mergeWith, remove } from 'lodash';
import { defineStore } from 'pinia';
import { mergeDeep } from 'src/helpers';
import { Model, RepositoryLinks, RepositoryMeta, RepositoryResponse, VideoModel, VideosParams, VideosState } from 'src/interfaces';

export const useStore = defineStore('videos', {
  state: () => (<VideosState>{
    id: Date.now(),
    data: <VideoModel[]>[],
    meta: <RepositoryMeta>{},
    links: <RepositoryLinks>{},
    params: <VideosParams>{
      query: null,
      sort: null,
      tags: null,
      type: null,
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
    reset(payload?: VideosParams): void {
      // Merge query
      this.$patch({ params: payload || {} });

      // Reset results
      this.data = <VideoModel[]>[];
      this.meta = <RepositoryMeta>{};
      this.links = <RepositoryLinks>{};
      this.id = Date.now();
    },

    populate(payload: RepositoryResponse): void {
      this.data = this.data.concat(payload.data);
      this.meta = payload.meta;
      this.links = payload.links;
    },

    delete(payload: Model | VideoModel): void {
      remove(this.data, { id: payload.id });
    },

    update(payload: Model | VideoModel): void {
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
