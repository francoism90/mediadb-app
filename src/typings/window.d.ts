export {}

declare global {
  interface Window {
    NavigationBar: NavigationBarPlugin
  }

  export interface NavigationBarPlugin {
    show(): Promise<void>
    hide(): Promise<void>
  }
}
