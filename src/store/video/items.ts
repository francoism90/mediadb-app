import { find, findIndex, mergeWith, remove } from 'lodash';
import { defineStore } from 'pinia';
import { mergeDeep } from 'src/helpers/utils';
import { VideoModel, VideosFilters, VideosLinks, VideosMeta, VideosQuery, VideosResponse, VideosState } from 'src/interfaces/video';

export const useStore = defineStore('videos', {
  state: () => (<VideosState>{
    id: Date.now(),
    query: <VideosQuery>{
      append: ['poster_url'],
      sort: 'relevance',
      filter: {
        type: null,
        tags: null,
        query: null,
      },
      page: {
        number: 1,
        size: 12,
      },
    },
    data: <VideoModel[]>[],
    meta: <VideosMeta>{},
    links: <VideosLinks>{},
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
    reset(payload?: VideosQuery): void {
      this.query = mergeWith(this.query, payload || {}, mergeDeep);
      this.data = <VideoModel[]>[];
      this.meta = <VideosMeta>{};
      this.links = <VideosLinks>{};
      this.id = Date.now();
    },

    populate(payload: VideosResponse): void {
      this.data = this.data.concat(payload.data);
      this.meta = payload.meta;
      this.links = payload.links;
    },

    filter(payload: VideosFilters): void {
      this.query.filter = mergeWith(this.query.filter, payload, mergeDeep);
    },

    sort(payload: string | string[] | null): void {
      this.query.sort = payload;
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
