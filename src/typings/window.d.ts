export {};

declare global {
  interface NavigationBarPlugin {
    show(): Promise<void>
    hide(): Promise<void>
  }

  interface Window {
    NavigationBar: NavigationBarPlugin
  }
}
