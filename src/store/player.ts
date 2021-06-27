import { defineStore } from 'pinia';
import {
  PlayerProperties, PlayerProps, PlayerRequest, PlayerState,
} from 'src/interfaces/player';
import { Model } from 'src/interfaces/repository';

export const usePlayerStore = defineStore({
  id: 'player',

  state: () => (<PlayerState>{
    id: null,
    type: 'auto',
    model: <Model>{},
    properties: <PlayerProperties>{},
    request: <PlayerRequest>{},
  }),

  getters: {
    isReady(): boolean {
      const readyState = this.properties.readyState || 0;

      return (
        this.properties.ended === false && readyState > 1
      );
    },
  },

  actions: {
    initialize(payload: PlayerProps): void {
      this.model = Object.assign(this.model, payload.model);
      this.source = payload.source;
      this.type = payload.type || 'auto';
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
