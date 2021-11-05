import { get, has } from 'lodash';
import { FieldError, ValidationResponse } from 'src/interfaces';
import { computed, reactive, readonly } from 'vue';

export const useValidation = () => {
  const state = reactive(<ValidationResponse>{});

  const resetResponse = () => Object.assign(state, <ValidationResponse>{});
  const setResponse = (response: ValidationResponse) => Object.assign(state, response);

  const hasError = (field: string) => has(state.errors, field);
  const getError = (field: string) => get(state.errors, field, undefined) as FieldError[];

  const message = computed(() => state.message || '');

  return {
    state: readonly(state),
    message,
    resetResponse,
    setResponse,
    hasError,
    getError,
  };
};
