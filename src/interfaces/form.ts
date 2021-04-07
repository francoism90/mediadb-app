export interface FieldError {
  [index: number]: string | number
}

export interface FormValidator {
  errors?: FieldError[],
  message?: string
}
