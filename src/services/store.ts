import { Model } from 'src/interfaces';
import { videoSimliar, videosStore } from 'src/store/pinia';

export const sync = [
  videosStore(),
  videoSimliar(),
];

/** Delete model by matching uuid */
export const deleted = (payload: Model) => sync.forEach((store) => store.delete(payload));

/** Update model by matching uuid */
export const updated = (payload: Model) => sync.forEach((store) => store.update(payload));
