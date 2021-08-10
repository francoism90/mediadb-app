import { defineStore } from 'pinia';
import {
  VideoState, VideoModel, VideoResponse,
} from 'src/interfaces/video';

export const useStore = defineStore({
  id: 'video-item',

  state: () => (<VideoState>{
    data: <VideoModel>{},
    meta: null,
  }),

  getters: {
    isReady(): boolean {
      return this.data && this.data.id === null;
    },
  },

  actions: {
    populate(payload: VideoResponse): void {
      this.$patch({
        data: payload.data,
        meta: payload.meta,
      });
    },
  },
});
