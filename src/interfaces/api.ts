export interface FieldError {
  [index: number]: string | number,
}

export interface ValidationResponse {
  errors: FieldError[] | undefined,
  message: string,
}
