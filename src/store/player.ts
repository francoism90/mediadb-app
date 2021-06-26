import { defineStore } from 'pinia';
import { PlayerProperties, PlayerState } from 'src/interfaces/player';

export const usePlayerStore = defineStore({
  id: 'player',

  state: () => (<PlayerState>{
    id: null,
    properties: <PlayerProperties>{},
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
    populate(payload: PlayerProperties): void {
      const propValues = { ...this.properties, ...payload };
      this.properties = { ...this.properties, ...propValues };
    },
  },
});
