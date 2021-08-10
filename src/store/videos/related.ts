import { merge, findIndex, remove } from 'lodash';
import { defineStore } from 'pinia';
import {
  VideosState, VideosQuery, VideosMeta, VideosLinks, VideoModel, VideosResponse,
} from 'src/interfaces/video';

export const useStore = defineStore({
  id: 'video-related',

  state: () => (<VideosState>{
    id: Date.now(),
    query: <VideosQuery>{
      append: ['clip', 'thumbnail_url'],
      sort: 'relevance',
      filter: {
        related: null,
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
      return this.links.first === undefined && this.links.next === undefined;
    },

    isFetchable(): boolean {
      return this.links.next !== null;
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

    delete(payload: VideoModel): void {
      remove(this.data, { id: payload.id });
    },

    replace(payload: VideoModel): void {
      const index = findIndex(this.data, { id: payload.id });

      if (index >= 0) {
        this.data = this.data.splice(index, 1, payload);
      }
    },
  },
});
