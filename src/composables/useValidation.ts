import { get, has } from 'lodash';
import { FieldError, ValidationResponse } from 'src/interfaces';
import { reactive, readonly } from 'vue';

export const useValidation = () => {
  const state = reactive(<ValidationResponse>{});

  const resetResponse = () => Object.assign(state, <ValidationResponse>{});
  const setResponse = (response: ValidationResponse) => Object.assign(state, response);

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
