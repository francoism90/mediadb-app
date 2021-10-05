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
  include?: string | string[] | null,
  fields?: string | string[] | null,
  append?: string | string[] | null,
  sort?: string | string[] | null,
  page?: {
    number?: number | null,
    size?: number | null,
  }
}
