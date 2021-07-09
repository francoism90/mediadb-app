import { useRelatedStore } from 'src/store/related';
import { useVideosStore } from 'src/store/videos';
import { AxiosError } from 'axios';
import useEcho from 'src/composables/useEcho';
import { ErrorResponse } from 'src/interfaces/api';
import { VideoModel } from 'src/interfaces/video';
import { find } from 'src/repositories/video';
import {
  Ref, ref, watch,
} from 'vue';

interface Props {
  id: Ref<string>
}

export default function useVideo(props: Props) {
  const related = useRelatedStore();
  const videos = useVideosStore();

  const { echo } = useEcho();

  const video = ref<VideoModel>();
  const errors = ref<ErrorResponse>();

  const fetch = async (): Promise<void> => {
    errors.value = <ErrorResponse>{};
    video.value = <VideoModel>{};

    try {
      const response = await find(props.id.value);
      video.value = response.data;

      // Update stores
      related.update(video.value);
      videos.update(video.value);
    } catch (e: unknown) {
      const error = e as AxiosError<ErrorResponse>;

      if (error.response) {
        errors.value = error.response.data;
        return;
      }

      throw error;
    }
  };

  const remove = async (): Promise<void> => {
    // Update stores
    if (video.value) {
      related.delete(video.value);
      videos.delete(video.value);
    }

    await fetch();
  };

  const subscribe = (id: string | number): void => {
    echo?.private(`video.${id}`)
      .listen('.video.deleted', remove)
      .listen('.video.updated', fetch);
  };

  const unsubscribe = (id: string | number): void => {
    echo?.leave(`video.${id}`);
  };

  watch(props.id, fetch, { immediate: true });

  return {
    subscribe,
    unsubscribe,
    errors,
    video,
  };
}
