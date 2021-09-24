import { find, findIndex, merge, remove } from 'lodash';
import { defineStore } from 'pinia';
import { VideoModel, VideosFilters, VideosLinks, VideosMeta, VideosQuery, VideosResponse, VideosState } from 'src/interfaces/video';

export const useStore = defineStore('videos', {
  state: () => (<VideosState>{
    id: Date.now(),
    query: <VideosQuery>{
      append: ['clips', 'poster_url'],
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
      this.query = merge(this.query, payload || {});
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
      this.query.filter = merge(this.query.filter, payload);
    },

    sort(payload: string | string[] | null): void {
      this.query.sort = payload;
    },

    delete(payload: VideoModel): void {
      remove(this.data, { id: payload.id });
    },

    replace(payload: VideoModel): void {
      const index = findIndex(this.data, { id: payload.id });

      if (index >= 0) {
        this.data.splice(index, 1, payload);
      }
    },

    update(payload: VideoModel): void {
      const model = find(this.data, { id: payload.id });

      if (model) {
        this.replace(merge(model, payload));
      }
    },
  },

  debounce: {
    reset: 100,
    delete: 50,
    replace: 50,
    update: 50,
  },
});
