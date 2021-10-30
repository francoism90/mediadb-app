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
  },
}
