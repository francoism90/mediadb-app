import { Model } from 'src/interfaces';
import { useStore as videoStore } from 'src/store/videos/item';
import { useStore as videosStore } from 'src/store/videos/items';
import { useStore as similarStore } from 'src/store/videos/similar';

const stores = [
  similarStore(),
  videoStore(),
  videosStore(),
];

export const useStores = () => {
  /** Delete model by matching uuid */
  const deleted = (payload: Model) => stores.forEach((store) => store.delete(payload));

  /** Update model by matching uuid */
  const updated = (payload: Model) => stores.forEach((store) => store.update(payload));

  return {
    stores,
    deleted,
    updated,
  };
};
