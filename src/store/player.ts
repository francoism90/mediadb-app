import { defineStore } from 'pinia';
import { merge } from 'lodash';
import {
  PlayerProperties, PlayerRequest, PlayerState, PlayerSource,
} from 'src/interfaces/player';
import { Model } from 'src/interfaces/repository';

export const usePlayerStore = defineStore({
  id: 'player',

  state: () => (<PlayerState>{
    ready: false,
    model: <Model>{},
    properties: <PlayerProperties>{
      readyState: 0,
      currentTime: 0,
      duration: 0,
      fullscreen: false,
    },
    request: <PlayerRequest>{},
  }),

  getters: {
    isLoading(): boolean {
      const readyState = this.properties.readyState || 0;

      return (
        this.properties.ended === false && readyState < 3
      );
    },
  },

  actions: {
    initialize(payload: PlayerSource): void {
      this.model = Object.assign(this.model, payload.model);
      this.source = payload.source || '';
      this.ready = true;
    },

    dispatch(payload: PlayerRequest): void {
      this.request = payload;
    },

    populate(payload: PlayerProperties): void {
      this.properties = merge(this.properties, payload);
    },
  },
});
