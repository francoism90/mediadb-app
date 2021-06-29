import { merge } from 'lodash';
import { defineStore } from 'pinia';
import {
  VideosState, VideosQuery, VideosMeta, VideosLinks, VideoModel, VideosResponse,
} from 'src/interfaces/video';

export const useRelatedStore = defineStore({
  id: 'related',

  state: () => (<VideosState>{
    id: null,
    query: <VideosQuery>{
      sort: 'recommended',
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
    reset(payload: VideosQuery): void {
      this.query = merge(this.query, payload);
      this.reload();
    },

    reload(): void {
      this.data = <VideoModel[]>[];
      this.meta = <VideosMeta>{};
      this.links = <VideosLinks>{ first: null, next: null };
      this.id = Date.now();
    },

    populate(payload: VideosResponse): void {
      this.data = this.data.concat(payload.data);
      this.links = payload.links;
      this.meta = payload.meta;
    },
  },
});
