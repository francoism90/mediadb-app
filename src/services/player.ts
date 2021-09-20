import { find } from 'lodash';
import { PlayerResolution } from 'src/interfaces/player';

export const resolutions: PlayerResolution[] = [
  { label: '2160p', icon: '4K', width: 3840, height: 2160 },
  { label: '1440p', icon: '2k', width: 2560, height: 1440 },
  { label: '1080p', icon: 'hd', width: 1920, height: 1080 },
  { label: '720p', icon: 'hd', width: 1280, height: 720 },
  { label: '480p', icon: 'sd', width: 854, height: 480 },
  { label: '360p', icon: 'sd', width: 640, height: 360 },
  { label: '240p', icon: 'sd', width: 426, height: 240 },
];

export function getResolution(height: number, width: number): PlayerResolution | undefined {
  const heightMatch = find(resolutions, (o) => height >= o.height);
  const widthMatch = find(resolutions, (o) => width >= o.width);

  return heightMatch || widthMatch;
}
