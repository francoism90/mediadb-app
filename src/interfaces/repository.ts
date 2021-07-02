export interface Model {
  id: string,
  slug: string,
  name: string,
  description?: string,
  favorite?: boolean,
  'created_at': Date,
  'updated_at': Date,
}

export interface ModelResponse extends Model {
  data: Model,
  exception?: string | null
  message?: string | null
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
