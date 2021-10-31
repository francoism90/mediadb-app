import { get, has } from 'lodash';
import { FieldError, ValidationResponse } from 'src/interfaces';
import { reactive, toRefs } from 'vue';

export const useValidation = () => {
  const state = reactive(<ValidationResponse>{});

  const resetResponse = () => Object.assign(state, <ValidationResponse>{});

  const setResponse = (response: ValidationResponse) => Object.assign(state, response);

  const hasError = (field: string): boolean => has(state.errors, field);
  const getError = (field: string): FieldError => get(
    state.errors, field, undefined,
  ) as FieldError;

  const hasMessage = (): boolean => state.message !== '';
  const getMessage = (): string => state.message || '';

  return {
    state: toRefs(state),
    resetResponse,
    setResponse,
    getError,
    getMessage,
    hasError,
    hasMessage,
  };
};
