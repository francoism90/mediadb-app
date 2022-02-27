import { AxiosError } from 'axios';

export interface Model {
  id: string,
  slug?: string,
  name?: string,
  description?: string,
  favorite?: boolean,
  following?: boolean,
  'created_at'?: string,
  'updated_at'?: string,
}

export interface ModelResponse {
  data: Model,
  meta: object,
}

export interface RepositoryMeta {
  'current_page': number,
  'last_page': number,
  'per_page': number,
  from: number,
  path: string,
  to: number,
  total: number,
}

export interface RepositoryLinks {
  first: string | null,
  last: string | null,
  next: string | null,
  prev: string | null,
}

export interface RepositoryResponse {
  data: Model[],
  meta: RepositoryMeta,
  links: RepositoryLinks,
}

export interface RepositoryParams {
  query?: string | null,
  sort?: string | string[] | null,
  page?: number | null,
  size?: number | null,
}

export type FieldError = string

export interface ErrorResponse {
  message: string,
}

export interface ValidationErrors {
  [index: number | string]: FieldError[],
}

export interface ValidationResponse {
  errors: ValidationErrors | undefined,
  message: string | undefined,
}

export type ResponseError = AxiosError<ErrorResponse, unknown>;

export type ValidationError = AxiosError<ValidationResponse, unknown>;

export interface LoadingState {
  ready: boolean,
  error: ErrorResponse | undefined
}
