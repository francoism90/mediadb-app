import { find, findIndex, mergeWith, remove } from 'lodash';
import { defineStore } from 'pinia';
import { mergeDeep } from 'src/helpers/obj';
import { RepositoryLinks, RepositoryMeta, RepositoryQuery } from 'src/interfaces/repository';
import { VideoModel, VideosReponse, VideosState } from 'src/interfaces/video';

export const useStore = defineStore('videos', {
  state: () => (<VideosState>{
    id: Date.now(),
    data: <VideoModel[]>[],
    meta: <RepositoryMeta>{},
    links: <RepositoryLinks>{},
    query: <RepositoryQuery>{
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
    reset(payload?: RepositoryQuery): void {
      // Merge query (when needed)
      this.$patch({ query: payload || {} });

      // Reset results
      this.data = <VideoModel[]>[];
      this.meta = <RepositoryMeta>{};
      this.links = <RepositoryLinks>{};
      this.id = Date.now();
    },

    populate(payload: VideosReponse): void {
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
