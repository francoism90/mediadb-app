import { useStore } from 'src/store';
import videosModule from 'src/store/videos';
import { createNamespacedHelpers } from 'vuex-composition-helpers';

export default function useVideos(module: string) {
  const $store = useStore();

  if (!$store.hasModule(module)) {
    $store.registerModule(module, videosModule);
  }

  const { useState, useActions, useGetters } = createNamespacedHelpers(module);

  const { initialize, repopulate } = useActions([
    'initialize',
    'repopulate',
  ]);

  const { id, items } = useState([
    'id',
    'items',
  ]);

  const { isLoadable, nextPage } = useGetters([
    'isLoadable',
    'nextPage',
  ]);

  return {
    initialize,
    repopulate,
    isLoadable,
    nextPage,
    id,
    items,
  };
}
