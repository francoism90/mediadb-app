import { assign } from 'lodash';
import { defineStore } from 'pinia';
import {
  VideosState, VideosQuery, VideosMeta, VideosLinks, VideoModel, VideosResponse,
} from 'src/interfaces/video';

export const useSessionStore = defineStore({
  id: 'session',

  state: () => (<VideosState>{
    id: null,
    query: <VideosQuery>{
      sort: 'recommended',
      'page[number]': 1,
      'page[size]': 12,
    },
    data: <VideoModel[]>[],
    meta: <VideosMeta>{},
    links: <VideosLinks>{},
  }),

  getters: {
    isLoadable(): boolean {
      return (this.links.first !== null && this.links.next !== null);
    },
  },

  actions: {
    reset(payload: VideosQuery | undefined): void {
      this.data = <VideoModel[]>[];
      this.meta = <VideosMeta>{};
      this.links = <VideosLinks>{};

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
