import { FieldError, FormValidator } from 'src/interfaces/form'
import { get, has } from 'lodash'
import { ApiValidationResponse } from 'src/interfaces/api'

export default function useFormValidation () {
  let validator = <FormValidator>{}

  const setResponse = (response: ApiValidationResponse) => {
    validator = response
  }

  const hasError = (field: string): boolean => {
    return has(validator.errors, field)
  }

  const getError = (field: string): FieldError => {
    return get(validator.errors, `${field}[0]`, <FieldError>{}) as FieldError
  }

  const hasMessage = (): boolean => {
    return validator.message !== ''
  }

  const getMessage = (): string => {
    return validator.message || ''
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
