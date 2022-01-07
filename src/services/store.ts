import { Model } from 'src/interfaces';
import { videoSimliar, videosStore, videoStore } from 'src/store/pinia';

export const sync = [
  videoStore(),
  videosStore(),
  videoSimliar(),
];

/** Delete model by matching uuid */
export const deleted = (payload: Model) => sync.forEach((store) => store.delete(payload));

/** Update model by matching uuid */
export const updated = (payload: Model) => sync.forEach((store) => store.update(payload));
