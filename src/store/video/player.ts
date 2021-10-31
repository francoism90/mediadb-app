import { find, first } from 'lodash';
import { defineStore } from 'pinia';
import { PlayerProperties, PlayerRequest, PlayerState, PlayerThumbnail } from 'src/interfaces';

export const useStore = defineStore('player', {
  state: () => (<PlayerState>{
    requests: <PlayerRequest>[],
    properties: <PlayerProperties>{},
    thumbnail: <PlayerThumbnail>{},
  }),

  getters: {
    request(): PlayerRequest {
      return first(this.requests) || {};
    },

    isWaiting(): boolean {
      return !this.properties?.ready || this.properties?.seeking;
    },

    spriteTrack(): TextTrack | undefined {
      return find(this.properties?.tracks, { label: 'sprite' }) as TextTrack;
    },
  },

  actions: {
    dispatch(payload: PlayerRequest): void {
      this.requests.unshift(payload);
    },

    sync(properties: PlayerProperties): void {
      this.$patch({ properties });
    },
  },

  debounce: {
    sync: 50,
  },
});
