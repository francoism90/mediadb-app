import { pick, debounce } from 'lodash';
import { useQuasar } from 'quasar';
import * as shaka from 'shaka-player';
import { PlayerProps } from 'src/interfaces/player';
import { PlayerState } from 'src/interfaces/store';
import { useStore } from 'src/store';
import playerModule from 'src/store/player';
import { ref, watch } from 'vue';
import { useNamespacedActions, useNamespacedGetters, useNamespacedState } from 'vuex-composition-helpers';

export default function usePlayer(props: PlayerProps) {
  const $q = useQuasar();
  const $store = useStore();

  const player = ref(<shaka.Player | null>(null));

  if (!$store.hasModule(props.module)) {
    $store.registerModule(props.module, playerModule);
  }

  const { media, model, properties } = useNamespacedState<PlayerState>(props.module, [
    'media',
    'model',
    'properties',
  ]);

  const { resetStore, initialize, setProperties } = useNamespacedActions(props.module, [
    'resetStore',
    'initialize',
    'setProperties',
  ]);

  const { isLoading } = useNamespacedGetters(props.module, [
    'isLoading',
  ]);

  if (props.module && props.media) {
    initialize(props);
  }

  const initPlayer = async (dom: HTMLMediaElement | null): Promise<void> => {
    const shakaPlayer = new shaka.Player(dom);

    shakaPlayer.configure({
      manifest: {
        dash: {
          ignoreMinBufferTime: true,
        },
        retryParameters: {
          timeout: 10000,
          stallTimeout: 5000,
          connectionTimeout: 10000,
          maxAttempts: 3,
          baseDelay: 1000,
          backoffFactor: 2,
          fuzzFactor: 0.5,
        },
      },
      streaming: {
        jumpLargeGaps: true,
        rebufferingGoal: 2,
        bufferingGoal: 60,
        bufferBehind: 30,
        ignoreTextStreamFailures: true,
        alwaysStreamText: true,
        stallEnabled: true,
        stallSkip: 10,
        stallThreshold: 1,
      },
    });

    try {
      player.value = await shakaPlayer.load(props.media?.stream_url || '') as shaka.Player;
    } catch (e: unknown) {
      console.error(e);
    }
  };

  const createPlayer = async (dom: HTMLMediaElement | null): Promise<void> => {
    if (!dom) {
      console.debug('Waiting for HTMLVideoElement..');
      return;
    }

    shaka.polyfill.installAll();

    if (shaka.Player.isBrowserSupported()) {
      await initPlayer(dom);
    } else {
      console.error('Browser not supported');
    }
  };

  const destroyPlayer = async (): Promise<void> => {
    await player.value?.detach();
    await player.value?.destroy();
  };

  const readonlyProperties = (event: Event | null): void => {
    const target = event?.target as HTMLMediaElement;

    if (!event || !target) {
      console.debug('Waiting for HTMLMediaElement..');
      return;
    }

    setProperties(pick(target, [
      'buffered',
      'currentSrc',
      'currentTime',
      'duration',
      'ended',
      'error',
      'muted',
      'networkState',
      'paused',
      'played',
      'readyState',
      'seekable',
      'seeking',
      'textTracks',
    ]));
  };

  const syncProperties = debounce(readonlyProperties, 100);

  // watch(() => player.value?.getTextTracks(), value => {
  //   setProperties({ textTracks: value })
  // })

  watch(() => $q.fullscreen.isActive, (value) => {
    setProperties({ fullscreen: value });
  });

  return {
    resetStore,
    initialize,
    setProperties,
    syncProperties,
    createPlayer,
    destroyPlayer,
    isLoading,
    player,
    model,
    media,
    properties,
  };
}
