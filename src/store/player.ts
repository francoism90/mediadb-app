import { defineStore } from 'pinia';
import { merge } from 'lodash';
import {
  PlayerProperties, PlayerRequest, PlayerState, PlayerTooltip,
} from 'src/interfaces/player';
import { MediaModel } from '../interfaces/media';
import { PlayerSource } from '../interfaces/player';

export const useStore = defineStore('player', {
  state: () => (<PlayerState>{
    source: <PlayerSource>{},
    properties: <PlayerProperties>{},
    request: <PlayerRequest>{},
    tooltip: <PlayerTooltip>{},
  }),

  getters: {
    isReady(): boolean {
      return typeof this.source.media !== 'undefined';
    },

    isLoading(): boolean {
      const readyState = this.properties.readyState || 0;
      return this.properties.ended === false && readyState < 3;
    },

    media(): MediaModel | undefined {
      return this.source.media;
    },
  },

  actions: {
    populate(payload: PlayerSource): void {
      this.source = payload;
    },

    dispatch(payload: PlayerRequest): void {
      this.request = payload;
    },

    update(payload: PlayerProperties): void {
      this.properties = merge(this.properties, payload);
    },

    capture(payload: PlayerTooltip): void {
      this.tooltip = payload;
    },
  },
});
