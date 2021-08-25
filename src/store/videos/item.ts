import { useStore as useRelatedStore } from 'src/store/videos/related';
import { useStore as useVideosStore } from 'src/store/videos/items';
import { defineStore } from 'pinia';
import { VideoState, VideoModel, VideoResponse } from 'src/interfaces/video';
import { merge } from 'lodash';

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
      this.$patch(payload);
      this.update(payload.data);
    },

    delete(payload: VideoModel): void {
      const related = useRelatedStore();
      const videos = useVideosStore();

      if (this.data.id === payload.id) {
        this.$reset();
      }

      related.delete(payload);
      videos.delete(payload);
    },

    update(payload: VideoModel): void {
      const related = useRelatedStore();
      const videos = useVideosStore();

      if (typeof this.data === 'object' && this.data.id === payload.id) {
        this.data = merge(this.data, payload);
      }

      related.update(payload);
      videos.update(payload);
    },
  },
});
