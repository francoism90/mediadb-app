import { StatusBar } from '@capacitor/status-bar';
import { has } from 'lodash';
import { Platform } from 'quasar';

export const useDevice = () => {
  const isUsable = () => has(Platform.is, 'capacitor');

  const screenOrientationLandscape = async () => window.screen.orientation.lock('landscape');
  const screenOrientationUnlock = () => window.screen.orientation.unlock();

  const hideStatusBar = async () => StatusBar.hide();
  const showStatusBar = async () => StatusBar.show();

  const hideNavigationBar = async () => window.NavigationBar.hide();
  const showNavigationBar = async () => window.NavigationBar.show();

  const onEnterFullScreen = async () => {
    await hideStatusBar();
    await hideNavigationBar();
    await screenOrientationLandscape();
  };

  const onLeaveFullScreen = async () => {
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
