export interface Model {
  id: string,
  slug: string,
  name: string,
  description: string,
  'created_at': Date,
  'updated_at': Date,
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
  first?: string | null,
  last?: string | null,
  next?: string | null,
  prev?: string | null,
}

export interface RepositoryQuery {
  include?: string[] | null,
  fields?: string[] | null,
  append?: string[] | null,
  sort?: string | string[] | null,
  page?: {
    number?: number | null,
    size?: number | null,
  }
}
