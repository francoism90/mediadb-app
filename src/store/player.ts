import { defineStore } from 'pinia';
import { PlayerProperties, PlayerState, PlayerTooltip } from 'src/interfaces/player';
import { VideoModel } from 'src/interfaces/video';

export const useStore = defineStore('player', {
  state: () => (<PlayerState>{
    model: <VideoModel>{},
    requestTime: 0,
    requestFullscreen: false,
    requestPause: false,
    properties: <PlayerProperties>{},
    tooltip: <PlayerTooltip>{},
  }),

  getters: {
    isLoading(): boolean {
      return !this.properties.ready || this.properties.seeking;
    },
  },

  actions: {
    capture(payload: PlayerTooltip): void {
      this.tooltip = payload;
    },
  },
});
