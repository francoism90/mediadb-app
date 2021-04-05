export interface FieldError {
  [index: number]: string | number
}

export interface FormValidator {
  errors?: {
    [key: string]: FieldError[]
  },
  message?: string,
  success?: boolean
}
