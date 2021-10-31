import { StatusBar } from '@capacitor/status-bar';
import { Platform } from 'quasar';

export const useDevice = () => {
  const isUsable = (): boolean => Platform.is.capacitor === true;

  const screenOrientationLandscape = async (): Promise<void> => {
    await window.screen.orientation.lock('landscape');
  };

  const screenOrientationUnlock = (): void => {
    window.screen.orientation.unlock();
  };

  const hideStatusBar = async (): Promise<void> => {
    await StatusBar.hide();
  };

  const showStatusBar = async (): Promise<void> => {
    await StatusBar.show();
  };

  const hideNavigationBar = async (): Promise<void> => {
    await window.NavigationBar.hide();
  };

  const showNavigationBar = async (): Promise<void> => {
    await window.NavigationBar.show();
  };

  const onEnterFullScreen = async (): Promise<void> => {
    await hideStatusBar();
    await hideNavigationBar();
    await screenOrientationLandscape();
  };

  const onLeaveFullScreen = async (): Promise<void> => {
    await showStatusBar();
    await showNavigationBar();
    screenOrientationUnlock();
  };

  return {
    isUsable,
    onEnterFullScreen,
    onLeaveFullScreen,
  };
};
