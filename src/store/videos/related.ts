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
    links: <VideosLinks>{
      first: null,
      next: null,
    },
  }),

  getters: {
    isQueryable(): boolean {
      return (this.links.first === null && this.links.next === null);
    },

    isFetchable(): boolean {
      return this.links.next !== null;
    },
  },

  actions: {
    reset(payload?: VideosQuery): void {
      this.$patch({
        query: merge(this.query, payload || {}),
        data: <VideoModel[]>[],
        meta: <VideosMeta>{},
        links: <VideosLinks>{},
      });

      this.id = Date.now();
    },

    populate(payload: VideosResponse): void {
      this.$patch({
        data: this.data.concat(payload.data),
        links: payload.links,
        meta: payload.meta,
      });
    },

    delete(payload: VideoModel): void {
      remove(this.data, { id: payload.id });
    },

    replace(payload: VideoModel): void {
      const index = findIndex(this.data, { id: payload.id });

      if (index < 0) {
        return;
      }

      this.$patch((state) => {
        state.data.splice(index, 1, payload);
      });
    },
  },
});
