import { defineStore } from 'pinia';
import { PlayerProperties, PlayerState } from 'src/interfaces/player';

export const usePlayerStore = defineStore({
  id: 'player',

  state: () => (<PlayerState>{
    id: null,
    fullscreen: false,
    playbackRate: 1.0,
    requestTime: 0,
    properties: <PlayerProperties>{
      controls: false,
      played: null,
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
