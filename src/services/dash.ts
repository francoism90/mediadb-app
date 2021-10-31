import { MediaPlayer, MediaPlayerClass } from 'dashjs';

export const create = (source: string, token: string, view: HTMLElement | undefined): MediaPlayerClass => {
  const player = MediaPlayer().create();

  player.extend('RequestModifier', () => ({
    modifyRequestHeader(xhr: XMLHttpRequest) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      return xhr;
    },
  }), true);

  player.initialize(view, source, true);

  return player;
};

export const destroy = (player: MediaPlayerClass | undefined): void => {
  player?.pause();

  player?.getVideoElement()?.childNodes?.forEach((child) => {
    player.getVideoElement()?.removeChild(child);
  });

  // @doc https://stackoverflow.com/a/28060352
  player?.getVideoElement()?.removeAttribute('src');
  player?.getVideoElement()?.load();

  player?.reset();
  player?.destroy();
};
