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
      buffered: null,
      currentSrc: null,
      currentTime: null,
      duration: null,
      ended: null,
      error: null,
      networkState: 0,
      paused: null,
      played: null,
      readyState: 0,
      seekable: null,
      seeking: null,
      textTracks: null,
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
