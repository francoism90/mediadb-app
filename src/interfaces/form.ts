export interface FieldError {
  [index: number]: string | number
}

export interface FormValidator {
  errors?: FieldError[],
  message?: string
}

export interface ValidationResponse {
  errors: FieldError[],
  message: string
}
