import { assign } from 'lodash';
import { defineStore } from 'pinia';
import {
  VideosState, VideosQuery, VideosMeta, VideosLinks, VideoModel, VideosResponse,
} from 'src/interfaces/video';

export const useVideosStore = defineStore({
  id: 'videos',

  state: () => (<VideosState>{
    id: null,
    query: <VideosQuery>{
      filter: {
        related: null,
      },
      sort: 'recommended',
      'page[number]': 1,
      'page[size]': 12,
    },
    data: <VideoModel[]>[],
    meta: <VideosMeta>{},
    links: <VideosLinks>{
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
    reset(payload: VideosQuery | undefined): void {
      this.data = <VideoModel[]>[];
      this.meta = <VideosMeta>{};
      this.links = <VideosLinks>{
        first: null,
        next: null,
      };

      if (payload) {
        this.query = assign(this.query, payload);
        this.id = Date.now();
      }
    },

    populate(payload: VideosResponse): void {
      this.data = this.data.concat(payload.data);
      this.links = payload.links;
      this.meta = payload.meta;
    },
  },
});
