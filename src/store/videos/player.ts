import { find } from 'lodash';
import { defineStore } from 'pinia';
import { PlayerProperties, PlayerRequest, PlayerState, PlayerTextTrack, PlayerTooltip, VideoModel } from 'src/interfaces';
import { useStore as useSessionStore } from 'src/store/session';
import { useStore as useVideoStore } from 'src/store/videos/item';

export const useStore = defineStore('player', {
  state: () => (<PlayerState>{
    ready: false,
    activity: false,
    controls: false,
    request: <PlayerRequest>{},
    properties: <PlayerProperties>{},
    tooltip: <PlayerTooltip>{},
  }),

  getters: {
    model(): VideoModel {
      const videoStore = useVideoStore();
      return videoStore.data;
    },

    token(): string {
      const sessionStore = useSessionStore();
      return sessionStore.token;
    },

    isReady(): boolean {
      return typeof this.properties?.videoTrack === 'object';
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
  },

  debounce: {
    sync: 50,
    dispatch: 50,
  },
});
