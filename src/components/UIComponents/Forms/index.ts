import { get, has } from 'lodash';
import { reactive, toRefs } from 'vue';

export interface FieldError {
  [index: number]: string | number,
}

export interface ValidationResponse {
  errors: FieldError[] | undefined,
  message: string,
}

export const state = reactive(<ValidationResponse>{});
export const validator = toRefs(state);

export const resetErrors = () => Object.assign(state, <ValidationResponse>{});

export const setErrors = (response: ValidationResponse) => Object.assign(state, response);

export const hasError = (field: string): boolean => has(validator.errors?.value, field);

export const getError = (field: string): FieldError => get(
  validator.errors?.value, field, undefined,
) as FieldError;

export const hasMessage = (): boolean => validator.message.value !== '';

export const getMessage = (): string => validator.message.value || '';
