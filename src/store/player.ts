import { defineStore } from 'pinia';
import {
  PlayerProperties, PlayerRequest, PlayerState, PlayerSource,
} from 'src/interfaces/player';
import { Model } from 'src/interfaces/repository';

export const usePlayerStore = defineStore({
  id: 'player',

  state: () => (<PlayerState>{
    ready: false,
    model: <Model>{},
    properties: <PlayerProperties>{},
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
      const propValues = { ...this.properties, ...payload };
      this.properties = { ...this.properties, ...propValues };
    },
  },
});
