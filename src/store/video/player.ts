import { find, merge } from 'lodash';
import { defineStore } from 'pinia';
import { PlayerProperties, PlayerState, PlayerTooltip } from 'src/interfaces/player';
import { VideoModel } from 'src/interfaces/video';

export const useStore = defineStore('player', {
  state: () => (<PlayerState>{
    model: <VideoModel>{},
    requestFullscreen: false,
    requestPause: false,
    requestTime: 0,
    properties: <PlayerProperties>{},
    tooltip: <PlayerTooltip>{},
  }),

  getters: {
    isReady(): boolean {
      return typeof this.model.id === 'string';
    },

    isWaiting(): boolean {
      return this.properties?.ready || this.properties?.seeking;
    },

    sprite(): TextTrack | undefined {
      return find(this.properties?.textTracks, { label: 'sprite' }) as TextTrack;
    },
  },

  actions: {
    delete(payload: VideoModel): void {
      if (this.model.id === payload.id) {
        this.$reset();
      }
    },

    update(payload: VideoModel): void {
      if (this.model.id === payload.id) {
        this.model = merge(this.model, payload);
      }
    },
  },
});
