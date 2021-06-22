import { AxiosError } from 'axios';
import { echoKey } from 'src/boot/echo';
import { ErrorResponse } from 'src/interfaces/api';
import { VideoModel } from 'src/interfaces/video';
import { find } from 'src/repositories/video';
import {
  inject, onMounted, Ref, ref, watch,
} from 'vue';

interface Props {
  id: Ref<string>
}

export default function useVideo(props: Props) {
  const video = ref(<VideoModel>{});
  const errors = ref(<ErrorResponse>{});

  const echo = inject(echoKey);

  const fetchVideo = async (): Promise<void> => {
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
      .listen('.video.deleted', fetchVideo)
      .listen('.video.updated', fetchVideo);
  };

  const unsubscribe = (id: string | number): void => {
    echo?.leave(`video.${id}`);
  };

  onMounted(fetchVideo);

  watch(props.id, fetchVideo);

  return {
    fetchVideo,
    subscribe,
    unsubscribe,
    errors,
    video,
  };
}
