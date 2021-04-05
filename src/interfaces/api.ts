import { FieldError } from './form'

export interface ApiValidationResponse {
  errors?: {
    [key: string]: FieldError[]
  },
  message?: string,
  success?: false
}
