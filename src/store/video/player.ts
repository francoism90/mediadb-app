import { find } from 'lodash';
import { defineStore } from 'pinia';
import { PlayerProperties, PlayerState, PlayerTooltip } from 'src/interfaces/player';
import { useStore as useVideoStore } from 'src/store/video/item';

export const useStore = defineStore('player', {
  state: () => (<PlayerState>{
    properties: <PlayerProperties>{},
    tooltip: <PlayerTooltip>{},
    controls: false,
    fullscreen: false,
    pause: false,
    time: 0,
  }),

  getters: {
    isWaiting(): boolean {
      return !this.properties?.ready || this.properties?.seeking;
    },

    spriteTrack(): TextTrack | undefined {
      return find(this.properties?.tracks, { label: 'sprite' }) as TextTrack;
    },

    spriteUrl(): string {
      const video = useVideoStore();

      return video.data?.sprite_url || '';
    },
  },

  actions: {
    sync(payload: PlayerProperties): void {
      this.$patch({ properties: payload });
    },
  },

  debounce: {
    sync: 50,
  },
});
