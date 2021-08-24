import { Player, polyfill } from 'shaka-player';

export const ShakaConfig = {
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
};

export function initialize(dom: HTMLMediaElement | undefined): Player {
  polyfill.installAll();

  if (!Player.isBrowserSupported()) {
    throw Error('Browser not supported');
  }

  const player = new Player(dom);
  player.configure(ShakaConfig);

  return player;
}
