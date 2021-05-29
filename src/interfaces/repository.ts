export interface Model {
  id: string | number,
  uuid?: string | null,
  slug?: string | null,
  name?: string | null,
  description?: string | null,
  favorite?: boolean | null,
  'prefixed_id'?: string | null,
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

export interface RepositoryLinks {
  'first'?: string | null,
  'last'?: string | null,
  next?: string | null,
  prev?: string | null,
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

export interface RepositoryParameters {
  params?: RepositoryParams,
  reset?: boolean,
}
