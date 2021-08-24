import { defineStore } from 'pinia';
import { merge } from 'lodash';
import { VideoState, VideoModel, VideoResponse } from 'src/interfaces/video';

export const useStore = defineStore({
  id: 'video',

  state: () => (<VideoState>{
    data: <VideoModel>{},
    meta: null,
  }),

  getters: {
    isReady(): boolean {
      return typeof this.data.id === 'string';
    },
  },

  actions: {
    populate(payload: VideoResponse): void {
      this.data = payload.data;
      this.meta = payload.meta;
    },

    update(payload: VideoModel): void {
      if (this.isReady && this.data.id === payload.id) {
        this.data = merge(payload, this.data);
      }
    },
  },
});
