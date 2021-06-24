import { defineStore } from 'pinia';
import { PlayerProperties, PlayerState } from 'src/interfaces/player';

export const usePlayerStore = defineStore({
  id: 'player',

  state: () => (<PlayerState>{
    id: null,
    properties: <PlayerProperties>{
      controls: false,
      fullscreen: false,
      playbackRate: 1.0,
      played: null,
      requestTime: 0,
      volume: 1,
    },
  }),

  getters: {
    isLoading(): boolean {
      return (
        !this.properties.ended
        && this.properties.readyState !== null
        && this.properties.readyState < 3
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
