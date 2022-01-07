import { defineStore } from 'pinia';
import { PlayerProperties, PlayerRequest, PlayerState } from 'src/interfaces';

export const useStore = defineStore('player', {
  state: () => (<PlayerState>{
    activity: false,
    controls: false,
    properties: <PlayerProperties>{},
    request: <PlayerRequest>{},
  }),

  getters: {
    // isReady(): boolean {
    //   // return typeof this.properties?.videoTrack === 'object';
    // },

    // isWaiting(): boolean {
    //   return !this.properties?.ready || this.properties?.seeking;
    // },

    // spriteTrack(): TextTrack {
    //   return find(this.properties?.tracks, { label: 'sprite' }) as TextTrack;
    // },

    // textTrack(): PlayerTextTrack {
    //   return this.properties?.textTrack;
    // },

    // textTracks(): PlayerTextTrack[] {
    //   return this.properties?.textTracks;
    // },
  },

  actions: {
    sync(properties: PlayerProperties): void {
      this.$patch({ properties });
    },

    dispatch(request: PlayerRequest): void {
      this.request = request;
    },
  },

  debounce: {
    sync: 50,
    dispatch: 50,
  },
});
