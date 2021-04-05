import { FormResponse } from 'src/interfaces/form'

export default function useFormValidation (result: FormResponse) {
  const validationErrors = result.errors || {}
  const validationMessage = result.message || ''
  const validationSuccess = result.success || false

  return {
    validationErrors,
    validationMessage,
    validationSuccess
  }
}
