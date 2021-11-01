import { ErrorResponse, LoadingState } from 'src/interfaces/api';
import { reactive, readonly } from 'vue';

const defaultState = () => <LoadingState>{
  ready: false,
  error: undefined,
};

export const useLoading = () => {
  const state = reactive(defaultState());

  const resetResponse = () => Object.assign(state, defaultState());
  const setResponse = (response: ErrorResponse) => { state.error = response; };

  const isLoading = () => { state.ready = false; };
  const isReady = () => { state.ready = true; };

  return {
    state: readonly(state),
    resetResponse,
    setResponse,
    isLoading,
    isReady,
  };
};
