import { get, has } from 'lodash';
import { FieldError, FormValidator, ValidationResponse } from 'src/interfaces/form';
import { ref } from 'vue';

export default function useValidation() {
  const validator = ref(<FormValidator>{});

  const setResponse = (response: ValidationResponse) => {
    validator.value = response;
  };

  const resetResponse = () => {
    validator.value = <ValidationResponse>{};
  };

  const hasError = (field: string): boolean => has(validator.value.errors, field);

  const getError = (field: string): FieldError => get(
    validator.value.errors, field, <FieldError>{},
  ) as FieldError;

  const hasMessage = (): boolean => validator.value.message !== '';

  const getMessage = (): string => validator.value.message || '';

  return {
    validator,
    getError,
    hasError,
    getMessage,
    hasMessage,
    setResponse,
    resetResponse,
  };
}
