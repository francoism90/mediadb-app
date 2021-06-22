import { SessionState } from 'src/interfaces/store';
import { useNamespacedMutations, useNamespacedState } from 'vuex-composition-helpers';

export default function useDrawer() {
  const { setDrawer } = useNamespacedMutations('session', ['setDrawer']);
  const { drawer } = useNamespacedState<SessionState>('session', ['drawer']);

  const toggleDrawer = (): void => {
    setDrawer(!drawer.value);
  };

  return {
    setDrawer,
    toggleDrawer,
    drawer,
  };
}
