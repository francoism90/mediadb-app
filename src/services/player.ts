import * as shaka from 'shaka-player';
import { VideoModel } from 'src/interfaces';
import { useStore } from 'src/store/videos/player';

export const store = useStore();

export const create = async (model: VideoModel, element: HTMLMediaElement | undefined, token: string) => {
  // Prepare browser
  await shaka.polyfill.installAll();

  // create player
  const player = new shaka.Player();

  // Set authorization header
  player.getNetworkingEngine()?.registerRequestFilter((type, request) => {
    request.headers.Authorization = `Bearer ${token}`;
  });

  // Load video
  if (element) {
    await player.attach(element);
    await player.load(model.dash_url || '');

    // Set default tracks
    const track = await player.addTextTrackAsync(model.sprite_url || '', 'en', 'metadata');

    player.selectTextTrack(track);
    player.setTextTrackVisibility(true);
  }

  return player;
};

export const eventManager = () => new shaka.util.EventManager();

export const sync = (element: HTMLMediaElement | undefined) => store.sync({
  readyState: element?.readyState || 0,
  buffered: element?.buffered,
  currentTime: element?.currentTime || 0,
  duration: element?.duration || 0,
  ended: element?.ended || true,
  error: element?.error,
  muted: element?.muted || false,
  networkState: element?.networkState || 0,
  paused: element?.paused || true,
  seekable: element?.seekable,
  textTracks: element?.textTracks || undefined,
  volume: element?.volume || 0,
});

export const events = [
  'abort',
  'canplay',
  'canplaythrough',
  'durationchange',
  'emptied',
  'ended',
  'error',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'pause',
  'play',
  'playing',
  'progress',
  'ratechange',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeupdate',
  'volumechange',
  'waiting',
];
