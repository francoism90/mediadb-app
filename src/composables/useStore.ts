import useVideo from 'src/composables/useVideo';
import { Model } from 'src/interfaces/repository';
import { VideoModel } from 'src/interfaces/video';

export default function useStore() {
  const { deleted: videoDeleted, updated: videoUpdated } = useVideo();

  /** Delete model in stores by matching uuid */
  const deleted = (payload: Model) => {
    videoDeleted(<VideoModel>payload);
  };

  /** Update model in stores by matching uuid */
  const updated = (payload: Model) => {
    videoUpdated(<VideoModel>payload);
  };

  return {
    deleted,
    updated,
  };
}
