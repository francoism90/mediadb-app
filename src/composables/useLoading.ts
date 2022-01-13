import { ErrorResponse, LoadingState } from 'src/interfaces/api';
import { reactive, readonly } from 'vue';

const defaultState = () => <LoadingState>{
  ready: false,
  error: undefined,
};

export const useLoading = () => {
  const state = reactive(defaultState());

  const startLoading = () => {
    Object.assign(state, defaultState());
  };

  const stopLoading = (response?: ErrorResponse) => {
    state.ready = true;
    state.error = response || state.error;
  };

  return {
    state: readonly(state),
    startLoading,
    stopLoading,
  };
};
