import { find } from 'lodash';
import { defineStore } from 'pinia';
import { PlayerEvent, PlayerProperties, PlayerState, PlayerTextTrack, PlayerTooltip, VideoModel } from 'src/interfaces';
import { useStore as useSessionStore } from 'src/store/session';
import { useStore as useVideoStore } from 'src/store/videos/item';

export const useStore = defineStore('player', {
  state: () => (<PlayerState>{
    ready: false,
    activity: false,
    controls: false,
    properties: <PlayerProperties>{},
    event: <PlayerEvent>{},
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

    dispatch(name: string, params?: string | number): void {
      this.event = { id: +new Date(), name, params };
    },
  },

  debounce: {
    sync: 50,
    dispatch: 50,
  },
});
