export interface FieldError {
  [index: number]: string | number
}

export interface FormResponse {
  errors?: {
    [key: string]: FieldError[]
  },
  message?: string,
  success?: boolean
}
