import { useSimilar } from 'src/composables/useSimilar';
import { useVideo } from 'src/composables/useVideo';
import { useVideos } from 'src/composables/useVideos';
import { Model, VideoModel } from 'src/interfaces';

export const useStores = () => {
  const { store: similarStore } = useSimilar();
  const { store: videoStore } = useVideo();
  const { store: videosStore } = useVideos();

  /** Delete model in stores by matching uuid */
  const deleted = (payload: Model) => {
    similarStore.delete(<VideoModel>payload);
    videoStore.delete(<VideoModel>payload);
    videosStore.delete(<VideoModel>payload);
  };

  /** Update model in stores by matching uuid */
  const updated = (payload: Model) => {
    similarStore.update(<VideoModel>payload);
    videoStore.update(<VideoModel>payload);
    videosStore.update(<VideoModel>payload);
  };

  return {
    deleted,
    updated,
  };
};
