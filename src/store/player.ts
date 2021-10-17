import { find, mergeWith } from 'lodash';
import { defineStore } from 'pinia';
import { PlayerProperties, PlayerSource, PlayerState, PlayerThumbnail } from 'src/interfaces/player';
import { VideoModel } from 'src/interfaces/video';
import { useStore as useVideoStore } from 'src/store/video/item';
import { mergeDeep } from 'src/utils/helpers';

export const useStore = defineStore('player', {
  state: () => (<PlayerState>{
    module: 'dashjs',
    properties: <PlayerProperties>{},
    source: <PlayerSource>{},
    thumbnail: <PlayerThumbnail>{},
    activity: false,
    controls: false,
    fullscreen: false,
    pause: false,
    time: 0,
  }),

  getters: {
    isReady(): boolean {
      return typeof this.source?.url === 'string';
    },

    isWaiting(): boolean {
      return !this.properties?.ready || this.properties?.seeking;
    },

    spriteTrack(): TextTrack | undefined {
      return find(this.properties?.tracks, { label: 'sprite' }) as TextTrack;
    },

    spriteUrl(): string {
      return this.video?.sprite_url || '';
    },

    video(): VideoModel | undefined {
      const video = useVideoStore();

      if (typeof this.source?.id === 'string' && this.source.id === video.data?.id) {
        return video.data;
      }

      return undefined;
    },
  },

  actions: {
    sync(payload: PlayerProperties): void {
      this.properties = mergeWith(this.properties, payload || {}, mergeDeep);
    },
  },

  debounce: {
    sync: 50,
  },
});
