import { merge } from 'lodash';
import { defineStore } from 'pinia';
import { PlayerProperties, PlayerState, PlayerTooltip } from 'src/interfaces/player';
import { VideoModel } from 'src/interfaces/video';

export const useStore = defineStore('player', {
  state: () => (<PlayerState>{
    model: <VideoModel>{},
    requestFullscreen: false,
    requestPause: false,
    requestTime: 0,
    properties: <PlayerProperties>{},
    tooltip: <PlayerTooltip>{},
  }),

  getters: {
    isWaiting(): boolean {
      return !this.properties.ready || this.properties.seeking;
    },
  },

  actions: {
    delete(payload: VideoModel): void {
      if (this.model.id === payload.id) {
        this.$reset();
      }
    },

    update(payload: VideoModel): void {
      if (this.model.id === payload.id) {
        this.model = merge(this.model, payload);
      }
    },
  },
});
