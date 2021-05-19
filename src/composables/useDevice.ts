import { StatusBar } from '@capacitor/status-bar';

export default function useDevice() {
  const screenOrientationLandscape = async (): Promise<void> => {
    await window.screen.orientation.lock('landscape');
  };

  const screenOrientationUnlock = (): void => {
    window.screen.orientation.unlock();
  };

  const setOverlaysWebView = async (): Promise<void> => {
    await StatusBar.setOverlaysWebView({ overlay: true });
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

  return {
    setOverlaysWebView,
    screenOrientationLandscape,
    screenOrientationUnlock,
    hideStatusBar,
    showStatusBar,
    hideNavigationBar,
    showNavigationBar,
  };
}
