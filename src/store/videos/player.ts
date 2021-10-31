import { find } from 'lodash';
import { defineStore } from 'pinia';
import { PlayerProperties, PlayerRequest, PlayerState, PlayerTextTrack, PlayerThumbnail } from 'src/interfaces';

export const useStore = defineStore('player', {
  state: () => (<PlayerState>{
    activity: false,
    controls: false,
    request: <PlayerRequest>{},
    properties: <PlayerProperties>{},
    thumbnail: <PlayerThumbnail>{},
  }),

  getters: {
    isReady(): boolean {
      return this.properties?.ready || false;
    },

    isWaiting(): boolean {
      return !this.properties?.ready || this.properties?.seeking;
    },

    spriteTrack(): TextTrack {
      return find(this.properties?.tracks, { label: 'sprite' }) as TextTrack;
    },

    textTrack(): PlayerTextTrack {
      return this.properties?.textTrack;
    },

    textTracks(): PlayerTextTrack[] {
      return this.properties?.textTracks;
    },
  },

  actions: {
    dispatch(request: PlayerRequest): void {
      this.request = request;
    },

    sync(properties: PlayerProperties): void {
      this.$patch({ properties });
    },
  },

  debounce: {
    dispatch: 50,
    sync: 50,
  },
});
