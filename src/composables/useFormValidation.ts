import { FieldError, FormResponse } from 'src/interfaces/form'
import { get, has } from 'lodash'

export default function useFormValidation (result: FormResponse) {
  const errors = result.errors || {}
  const message = result.message || ''
  const success = result.success || false

  const hasError = (field: string): boolean => {
    return has(errors, field)
  }

  const getError = (field: string): FieldError => {
    return get(errors, `${field}[0]`, <FieldError>{}) as FieldError
  }

  return {
    errors,
    message,
    success,
    hasError,
    getError
  }
}
