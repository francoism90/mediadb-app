import { Model } from 'src/interfaces/repository';
import { defineStore } from 'pinia';
import { merge } from 'lodash';
import {
  PlayerProperties, PlayerRequest, PlayerState, PlayerSource,
} from 'src/interfaces/player';

export const useStore = defineStore({
  id: 'player',

  state: () => (<PlayerState>{
    model: <Model>{},
    properties: <PlayerProperties>{},
    request: <PlayerRequest>{},
  }),

  getters: {
    isReady(): boolean {
      return typeof this.model.id === 'string' && typeof this.source === 'string';
    },

    isLoading(): boolean {
      const readyState = this.properties.readyState || 0;
      return this.properties.ended === false && readyState < 3;
    },
  },

  actions: {
    initialize(payload: PlayerSource): void {
      this.model = payload.model;
      this.source = payload.source || '';
    },

    dispatch(payload: PlayerRequest): void {
      this.request = payload;
    },

    populate(payload: PlayerProperties): void {
      this.properties = merge(this.properties, payload);
    },
  },
});
