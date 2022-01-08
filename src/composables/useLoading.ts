import { useQuasar } from 'quasar';
import { ErrorResponse, LoadingState } from 'src/interfaces/api';
import { reactive, readonly } from 'vue';

const defaultState = () => <LoadingState>{
  ready: false,
  error: undefined,
};

export const useLoading = () => {
  const $q = useQuasar();

  const state = reactive(defaultState());

  const startLoading = () => {
    Object.assign(state, defaultState());

    $q.loadingBar.start();
  };

  const stopLoading = (response?: ErrorResponse) => {
    state.ready = true;
    state.error = response || state.error;

    $q.loadingBar.stop();
  };

  const incrementLoading = (value: number) => $q.loadingBar.increment(value);

  return {
    state: readonly(state),
    startLoading,
    stopLoading,
    incrementLoading,
  };
};
