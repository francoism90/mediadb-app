import { Player } from 'shaka-player';
import { VideoModel } from 'src/interfaces/video';
import { initialize } from 'src/services/shaka';
import { usePlayerStore } from 'src/store/player';
import {
  Ref, ref,
} from 'vue';

interface Props {
  video?: Ref<VideoModel>
}

export default function usePlayer(props: Props) {
  const player = ref<Player>();
  const store = usePlayerStore();

  const useVideo = async (dom: HTMLMediaElement | null): Promise<void> => {
    const source = props.video?.value?.clip?.stream_url || ''; // TODO: add placeholder

    try {
      player.value = initialize(dom);

      await player.value.load(source);
    } catch (e: unknown) {
      console.error(e);
    }
  };

  const destroy = async (): Promise<void> => {
    await player.value?.detach();
    await player.value?.destroy();
  };

  return {
    useVideo,
    destroy,
    player,
    store,
  };
}
