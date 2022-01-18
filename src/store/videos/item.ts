import { defineStore } from 'pinia';
import { dateFormat, timeFormat } from 'src/helpers';
import { Model, ModelResponse, VideoModel, VideoState } from 'src/interfaces';

export const useStore = defineStore('video', {
  state: () => (<VideoState>{
    data: <VideoModel>{},
    meta: null,
  }),

  getters: {
    id(): string | undefined {
      return this.data?.id;
    },

    name(): string | undefined {
      return this.data?.name;
    },

    duration(): string {
      return timeFormat(this.data?.duration);
    },

    created(): string {
      return dateFormat(this.data?.created_at);
    },
  },

  actions: {
    populate(payload: ModelResponse): void {
      if (this.id !== payload.data.id) {
        this.$reset();
      }

      this.$patch(payload);
    },

    delete(payload: Model | VideoModel): void {
      if (this.id === payload.id) {
        this.$reset();
      }
    },

    update(payload: Model | VideoModel): void {
      if (this.id === payload.id) {
        this.$patch({ data: payload });
      }
    },
  },

  debounce: {
    delete: 50,
    update: 50,
  },
});
