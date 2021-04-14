import { get, has } from 'lodash'
import { FieldError, FormValidator, ValidationResponse } from 'src/interfaces/form'
import { ref } from 'vue'

export default function useFormValidation () {
  const validator = ref(<FormValidator>{})

  const setResponse = (response: ValidationResponse) => {
    validator.value = response
  }

  const hasError = (field: string): boolean => {
    return has(validator.value.errors, field)
  }

  const getError = (field: string): FieldError => {
    return get(validator.value.errors, `${field}[0]`, <FieldError>{}) as FieldError
  }

  const hasMessage = (): boolean => {
    return validator.value.message.length === 0
  }

  const getMessage = (): string => {
    return validator.value.message || ''
  }

  return {
    validator,
    getError,
    hasError,
    getMessage,
    hasMessage,
    setResponse
  }
}
