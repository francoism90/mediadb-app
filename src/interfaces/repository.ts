export interface Model {
  id: string | number,
  uuid?: string | null,
  slug?: string | null,
  name?: string | null,
  description?: string | null,
  'created_at'?: Date | null,
  'updated_at'?: Date | null,
}

export interface ModelResponse {
  data: Model,
}

export interface RepositoryParams {
  sort?: string | null,
  page?: number | null,
}

export interface RepositoryMeta {
  'current_page'?: number,
  'last_page'?: number,
  'per_page'?: number,
  from?: number,
  path?: string,
  to?: number,
  total?: number,
}

export interface RepositoryLinks {
  'first'?: string | null,
  'last'?: string | null,
  next?: string | null,
  prev?: string | null,
}

export interface RepositoryParameters {
  params?: RepositoryParams,
  reset?: boolean,
}

export interface RepositoryResponse {
  data: Model[],
  links: RepositoryLinks
  meta: RepositoryMeta
}

export interface RepositoryProps {
  module: string,
  params?: RepositoryParams,
}
