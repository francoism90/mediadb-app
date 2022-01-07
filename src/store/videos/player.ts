import { find } from 'lodash';
import { defineStore } from 'pinia';
import { PlayerProperties, PlayerRequest, PlayerState, PlayerTextTrack, PlayerTooltip, VideoModel } from 'src/interfaces';
import { useStore as useVideoStore } from 'src/store/videos/item';

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
      return typeof this.properties?.videoTrack === 'object';
    },

    isWaiting(): boolean {
      return !this.properties?.ready || this.properties?.seeking;
    },

    model(): VideoModel {
      const videoStore = useVideoStore();
      return videoStore.data;
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
  },

  debounce: {
    sync: 50,
    dispatch: 50,
  },
});
