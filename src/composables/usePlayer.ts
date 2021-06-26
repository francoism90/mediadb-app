import { Player } from 'shaka-player';
import { VideoModel } from 'src/interfaces/video';
import { initialize } from 'src/services/shaka';
import { syncEvents } from 'src/services/player';
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

  const syncProperties = (): void => {
    // store.populate(payload)
  };

  const useVideo = async (dom: HTMLMediaElement | null): Promise<void> => {
    const source = props.video?.value.clip?.stream_url || '';

    try {
      const shakaPlayer = initialize(dom);
      player.value = await shakaPlayer.load(source) as Player;
    } catch (e: unknown) {
      console.error(e);
    }
  };

  const useEvents = (dom: HTMLMediaElement | null): void => {
    syncEvents.forEach((event) => {
      dom?.addEventListener(event, syncProperties);
    });
  };

  const destroyEvents = (dom: HTMLMediaElement | null): void => {
    syncEvents.forEach((event) => {
      dom?.removeEventListener(event, syncProperties);
    });
  };

  const destroyVideo = async (): Promise<void> => {
    await player.value?.detach();
    await player.value?.destroy();
  };

  return {
    useVideo,
    useEvents,
    destroyVideo,
    destroyEvents,
    player,
    store,
  };
}
