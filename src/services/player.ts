import { find, inRange } from 'lodash';
import { PlayerTrack } from 'src/interfaces';
import { blob } from 'src/services/api';
import { playerStore } from 'src/store';

export const getSpriteCue = (time: number) => find(
  playerStore.spriteTrack?.cues, (o: VTTCue) => inRange(time, o.startTime, o.endTime),
);

export const getThumbnailTrack = (time: number) => {
  const cue = getSpriteCue(time) as VTTCue;

  return JSON.parse(cue?.text || '') as PlayerTrack;
};

export const getThumbnail = async (time: number) => {
  const track = getThumbnailTrack(time);

  return blob(track?.src || '');
};
