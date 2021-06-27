import { AxiosError } from 'axios';
import useEcho from 'src/composables/useEcho';
import { ErrorResponse } from 'src/interfaces/api';
import { VideoModel } from 'src/interfaces/video';
import { find } from 'src/repositories/video';
import {
  onMounted, Ref, ref, watch,
} from 'vue';

interface Props {
  id: Ref<string>
}

export default function useVideo(props: Props) {
  const { echo } = useEcho();

  const video = ref<VideoModel>();
  const errors = ref<ErrorResponse>();

  const fetch = async (): Promise<void> => {
    errors.value = <ErrorResponse>{};
    video.value = <VideoModel>{};

    try {
      const response = await find(props.id.value);
      video.value = response.data;
    } catch (e: unknown) {
      const error = e as AxiosError<ErrorResponse>;

      if (error.response) {
        errors.value = error.response.data;
        return;
      }

      throw error;
    }
  };

  const subscribe = (id: string | number): void => {
    echo?.private(`video.${id}`)
      .listen('.video.deleted', fetch)
      .listen('.video.updated', fetch);
  };

  const unsubscribe = (id: string | number): void => {
    echo?.leave(`video.${id}`);
  };

  onMounted(fetch);
  watch(props.id, fetch);

  return {
    subscribe,
    unsubscribe,
    errors,
    video,
  };
}
