import { MediaPlayerClass as DashPlayer } from 'dashjs';
import { find, inRange } from 'lodash';
import { PlayerResolution, PlayerSource } from 'src/interfaces/player';
import { create as createDashPlayer, destroy as DestroyDashPlayer, sync as SyncDashEvents, videoTrackBitrate } from 'src/services/dash';
import { useStore } from 'src/store/player';

export const store = useStore();

export const resolutions: PlayerResolution[] = [
  { label: '2160p', icon: '4K', width: 3840, height: 2160 },
  { label: '1440p', icon: '2k', width: 2560, height: 1440 },
  { label: '1080p', icon: 'hd', width: 1920, height: 1080 },
  { label: '720p', icon: 'hd', width: 1280, height: 720 },
  { label: '480p', icon: 'sd', width: 854, height: 480 },
  { label: '360p', icon: 'sd', width: 640, height: 360 },
  { label: '240p', icon: 'sd', width: 426, height: 240 },
];

export const initialize = (
  source: PlayerSource,
  view: HTMLElement | undefined,
): DashPlayer | undefined => {
  store.$patch({ source });

  if (store.module === 'dashjs') {
    return createDashPlayer(source.url || '', view);
  }

  return undefined;
};

export const destroy = (player: DashPlayer | undefined): void => {
  if (store.module === 'dashjs') {
    DestroyDashPlayer(player);
  }

  store.$reset();
};

export const sync = (player: DashPlayer | undefined): void => {
  if (store.module === 'dashjs') {
    SyncDashEvents(player);
  }
};

export const update = (player: DashPlayer | undefined): void => {
  if (store.module === 'dashjs') {
    player?.updatePortalSize();
  }
};

export const getSpriteCue = (time: number) => find(store.spriteTrack?.cues, (o: VTTCue) => inRange(
  time, o.startTime, o.endTime,
));

export const getResolution = (height: number, width: number): PlayerResolution | undefined => {
  const heightMatch = resolutions.find((e) => height >= e.height);
  const widthMatch = resolutions.find((e) => width >= e.width);

  return heightMatch || widthMatch;
};

export const videoResolution = (): PlayerResolution | undefined => {
  if (store.module === 'dashjs') {
    const bitrate = videoTrackBitrate();

    return getResolution(bitrate?.height || 0, bitrate?.width || 0);
  }

  return undefined;
};
