import { StatusBar } from '@capacitor/status-bar';
import { Platform } from 'quasar';

export const isUsable = (): boolean => Platform.is.capacitor === true;

export const screenOrientationLandscape = async (): Promise<void> => {
  await window.screen.orientation.lock('landscape');
};

export const screenOrientationUnlock = (): void => {
  window.screen.orientation.unlock();
};

export const hideStatusBar = async (): Promise<void> => {
  await StatusBar.hide();
};

export const showStatusBar = async (): Promise<void> => {
  await StatusBar.show();
};

export const hideNavigationBar = async (): Promise<void> => {
  await window.NavigationBar.hide();
};

export const showNavigationBar = async (): Promise<void> => {
  await window.NavigationBar.show();
};

export const onEnterFullScreen = async (): Promise<void> => {
  await hideStatusBar();
  await hideNavigationBar();
  await screenOrientationLandscape();
};

export const onLeaveFullScreen = async (): Promise<void> => {
  await showStatusBar();
  await showNavigationBar();

  screenOrientationUnlock();
};
