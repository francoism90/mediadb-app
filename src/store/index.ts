// Overrule Quasar default Vuex store export
/* eslint-disable */

export { store as sessionStore } from './session';
export { store as tagsStore } from './tag/items';
export { store as videoStore } from './videos/item';
export { store as videosStore } from './videos/items';
export { store as playerStore } from './videos/player';
export { store as similarStore } from './videos/similar';

export default function (): void {}
