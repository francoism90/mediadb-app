import { merge } from 'lodash';
import { defineStore } from 'pinia';
import { VideoModel, VideoResponse, VideoState } from 'src/interfaces/video';
import { useStore as useVideosStore } from 'src/store/video/items';
import { useStore as usePlayerStore } from 'src/store/video/player';
import { useStore as useSimilarStore } from 'src/store/video/similar';

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
      if (typeof this.data === 'object' && this.data.id !== payload.data.id) {
        this.$reset();
      }

      this.$patch(payload);
      this.update(payload.data);
    },

    delete(payload: VideoModel): void {
      const player = usePlayerStore();
      const similar = useSimilarStore();
      const videos = useVideosStore();

      if (this.data.id === payload.id) {
        this.$reset();
      }

      player.delete(payload);
      similar.delete(payload);
      videos.delete(payload);
    },

    update(payload: VideoModel): void {
      const player = usePlayerStore();
      const similar = useSimilarStore();
      const videos = useVideosStore();

      if (this.data.id === payload.id) {
        this.data = merge(this.data, payload);
      }

      player.update(payload);
      similar.update(payload);
      videos.update(payload);
    },
  },

  debounce: {
    delete: 50,
    update: 50,
  },
});
