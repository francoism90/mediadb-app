import { find } from 'lodash';
import { defineStore } from 'pinia';
import { PlayerProperties, PlayerRequest, PlayerState, PlayerTextTrack, PlayerTooltip } from 'src/interfaces';

export const useStore = defineStore('player', {
  state: () => (<PlayerState>{
    activity: false,
    controls: false,
    request: <PlayerRequest>{},
    properties: <PlayerProperties>{},
    tooltip: <PlayerTooltip>{},
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
    sync(properties: PlayerProperties): void {
      this.$patch({ properties });
    },

    dispatch(request: PlayerRequest): void {
      this.request = request;
    },

    tooltip(tooltip: PlayerTooltip): void {
      this.$patch({ tooltip });
    },
  },

  debounce: {
    sync: 50,
    dispatch: 50,
  },
});

export const store = useStore();
