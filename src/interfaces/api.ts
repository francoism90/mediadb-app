export interface ErrorResponse {
  message: string,
  exception: string
}

export interface ModelResponse {
  model: string,
  exception?: string | null
  message?: string | null
}
