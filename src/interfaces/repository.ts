export interface Model {
  id: string | number,
  uuid?: string | number | null,
  slug?: string | number | null,
  name?: string | number | null,
  description?: string | null,
  'prefixed_id'?: string | number | null,
  'created_at'?: Date | null,
  'updated_at'?: Date | null,
}

export interface ModelResponse {
  data: Model,
}

export interface RepositoryParams {
  include?: string | null,
  fields?: string | null,
  append?: string | null,
  sort?: string | number | null,
  'filter[query]'?: string | null,
  'page[number]'?: number | null,
  'page[size]'?: number | null,
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

export interface RepositoryResponse {
  data: Model[],
  meta: RepositoryMeta
}

export interface RepositoryProps {
  module: string,
  params?: RepositoryParams,
}

export interface RepositoryParameters {
  params?: RepositoryParams,
  reset?: boolean,
}
