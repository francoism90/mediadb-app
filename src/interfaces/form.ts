export interface FieldError {
  [index: number]: { message: string | number }
}

export interface FormResponse {
  errors?: FieldError[],
  message?: string,
  success?: boolean
}
