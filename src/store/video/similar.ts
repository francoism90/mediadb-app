import { find, findIndex, mergeWith, remove } from 'lodash';
import { defineStore } from 'pinia';
import { VideoModel, VideosLinks, VideosMeta, VideosQuery, VideosResponse, VideosState } from 'src/interfaces/video';
import { mergeDeep } from 'src/utils/helpers';

export const useStore = defineStore('video-similar', {
  state: () => (<VideosState>{
    id: Date.now(),
    query: <VideosQuery>{
      append: ['poster_url'],
      sort: 'relevance',
      filter: {
        similar: null,
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
    isReady(): boolean {
      return typeof this.query.filter?.similar === 'string';
    },

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
