import { defineStore } from 'pinia';
import { PlayerProperties, PlayerRequest, PlayerState } from 'src/interfaces/player';

export const usePlayerStore = defineStore({
  id: 'player',

  state: () => (<PlayerState>{
    id: null,
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
    dispatch(payload: PlayerRequest): void {
      this.request = payload;
    },

    populate(payload: PlayerProperties): void {
      const propValues = { ...this.properties, ...payload };
      this.properties = { ...this.properties, ...propValues };
    },
  },
});
