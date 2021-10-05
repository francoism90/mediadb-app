import { StatusBar } from '@capacitor/status-bar';
import { useQuasar } from 'quasar';

export default function useDevice() {
  const $q = useQuasar();

  const isUsable = (): boolean => $q.platform.is.capacitor === true;

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
}
