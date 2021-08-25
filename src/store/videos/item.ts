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
      const related = useRelatedStore();
      const videos = useVideosStore();

      this.$patch(payload);

      if (typeof payload.data === 'object') {
        related.update(payload.data);
        videos.update(payload.data);
      }
    },

    update(payload: VideoModel): void {
      if (typeof this.data === 'undefined' || this.data.id !== payload.id) {
        return;
      }

      this.data = merge(this.data, payload);
    },
  },
});
