export interface Model {
  id: string,
  name: string,
  slug?: string,
  description?: string,
  favorite?: boolean,
  following?: boolean,
  'created_at': string,
  'updated_at': string,
}

export interface ModelResponse {
  data: Model,
  meta: null,
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

export type RepositoryOption = string | string[] | null

export interface RepositoryFilter {
  [key: string]: RepositoryOption,
}

export interface RepositoryQuery {
  include?: RepositoryOption,
  fields?: RepositoryOption,
  filter?: RepositoryFilter,
  append?: RepositoryOption,
  sort?: RepositoryOption,
  page?: {
    number?: number | null,
    size?: number | null,
  }
}

export type FieldError = string

export interface ValidationErrors {
  [index: number | string]: FieldError[],
}

export interface ValidationResponse {
  errors: ValidationErrors,
  message: string,
}
