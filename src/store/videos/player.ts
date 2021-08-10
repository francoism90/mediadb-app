import { defineStore } from 'pinia';
import { merge } from 'lodash';
import {
  PlayerProperties, PlayerRequest, PlayerState, PlayerSource,
} from 'src/interfaces/player';
import { VideoModel } from 'src/interfaces/video';

export const useStore = defineStore({
  id: 'player',

  state: () => (<PlayerState>{
    model: <VideoModel>{},
    properties: <PlayerProperties>{},
    request: <PlayerRequest>{},
  }),

  getters: {
    isReady(): boolean {
      return (this.model !== null && this.source !== null);
    },

    isLoading(): boolean {
      const readyState = this.properties.readyState || 0;
      return (this.properties.ended === false && readyState < 3);
    },
  },

  actions: {
    initialize(payload: PlayerSource): void {
      this.$patch({
        model: payload.model,
        source: payload.source || '',
      });
    },

    dispatch(payload: PlayerRequest): void {
      this.request = payload;
    },

    populate(payload: PlayerProperties): void {
      this.properties = merge(this.properties, payload);
    },
  },
});
