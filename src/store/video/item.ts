import { defineStore } from 'pinia';
import { VideoModel, VideoResponse, VideoState } from 'src/interfaces/video';

export const useStore = defineStore('video', {
  state: () => (<VideoState>{
    data: <VideoModel>{},
    meta: null,
  }),

  getters: {
    isReady(): boolean {
      return typeof this.data?.id === 'string';
    },
  },

  actions: {
    populate(payload: VideoResponse): void {
      if (typeof this.data?.id === 'string' && this.data.id !== payload.data.id) {
        this.$reset();
      }

      this.$patch(payload);
    },

    delete(payload: VideoModel): void {
      if (typeof this.data?.id === 'string' && this.data.id === payload.id) {
        this.$reset();
      }
    },

    update(payload: VideoModel): void {
      if (typeof this.data?.id === 'string' && this.data.id === payload.id) {
        this.$patch({ data: payload });
      }
    },
  },

  debounce: {
    delete: 50,
    update: 50,
  },
});
