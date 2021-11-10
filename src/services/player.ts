import { find, inRange } from 'lodash';
import { PlayerTrack } from 'src/interfaces';
import { blob } from 'src/services/api';
import { useStore } from 'src/store/videos/player';

export const store = useStore();

export const resolutions = [
  { label: '2160p', icon: '4K', width: 3840, height: 2160 },
  { label: '1440p', icon: '2k', width: 2560, height: 1440 },
  { label: '1080p', icon: 'hd', width: 1920, height: 1080 },
  { label: '720p', icon: 'hd', width: 1280, height: 720 },
  { label: '480p', icon: 'sd', width: 854, height: 480 },
  { label: '360p', icon: 'sd', width: 640, height: 360 },
  { label: '240p', icon: 'sd', width: 426, height: 240 },
];

export const getSpriteCue = (time: number) => find(store.spriteTrack?.cues, (o: VTTCue) => inRange(
  time,
  o.startTime,
  o.endTime,
));

export const getThumbnailTrack = (time: number) => {
  const cue = getSpriteCue(time) as VTTCue;

  return JSON.parse(cue?.text || '{}') as PlayerTrack;
};

export const getThumbnail = async (time: number) => {
  const track = getThumbnailTrack(time);

  return blob(track?.src || '');
};

export const getResolution = (height: number, width: number) => {
  const heightMatch = resolutions.find((e) => height >= e.height);
  const widthMatch = resolutions.find((e) => width >= e.width);

  return heightMatch || widthMatch;
};
