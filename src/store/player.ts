import { merge } from 'lodash';
import { defineStore } from 'pinia';
import { MediaModel } from 'src/interfaces/media';
import { PlayerRequest, PlayerSource, PlayerState, PlayerTooltip } from 'src/interfaces/player';

export const useStore = defineStore('player', {
  state: () => (<PlayerState>{
    properties: <HTMLVideoElement>{},
    request: <PlayerRequest>{},
    source: <PlayerSource>{},
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

    sync(payload: HTMLVideoElement): void {
      this.properties = merge(this.properties, payload);
    },

    capture(payload: PlayerTooltip): void {
      this.tooltip = payload;
    },
  },
});
