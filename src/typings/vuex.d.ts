import { StoreState } from 'src/interfaces/store';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<StoreState>
  }
}
