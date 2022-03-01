import { get, has } from 'lodash';
import { FieldError, ValidationState } from 'src/interfaces';
import { reactive, readonly } from 'vue';

const defaultState = () => <ValidationState>{
  errors: undefined,
  message: undefined,
};

export const useValidation = () => {
  const state = reactive(defaultState());

  const resetResponse = () => Object.assign(state, defaultState());
  const setResponse = (response: unknown) => Object.assign(state, response);

  const hasError = (field: string) => has(state.errors, field);
  const getError = (field: string) => get(state.errors, field, undefined) as FieldError[];

  return {
    resetResponse,
    setResponse,
    hasError,
    getError,
    state: readonly(state),
  };
};
