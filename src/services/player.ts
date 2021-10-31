import { find, inRange } from 'lodash';
import { PlayerTrack } from 'src/interfaces';
import { blob } from 'src/services/api';
import { useStore } from 'src/store/videos/player';

export const store = useStore();

export const getSpriteCue = (time: number) => find(
  store.spriteTrack?.cues, (o: VTTCue) => inRange(time, o.startTime, o.endTime),
);

export const getThumbnailTrack = (time: number): PlayerTrack | undefined => {
  const cue = getSpriteCue(time) as VTTCue;

  return JSON.parse(cue?.text || '') as PlayerTrack;
};

export const getThumbnail = async (time: number): Promise<Blob> => {
  const track = getThumbnailTrack(time);

  return blob(track?.url || '');
};
