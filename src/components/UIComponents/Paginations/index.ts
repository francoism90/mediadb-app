export interface PaginateMeta {
  'current_page': number,
  'last_page': number,
  'per_page': number,
  from: number,
  path: string,
  to: number,
  total: number,
}

export interface PaginateLinks {
  first: string | null,
  last: string | null,
  next: string | null,
  prev: string | null,
}

export interface PaginateResponse {
  meta: PaginateMeta,
  links: PaginateLinks,
}

export type PaginateOption = string | string[] | null

export interface PaginateFilter {
  [key: string]: PaginateOption,
}

export interface PaginateQuery {
  include?: PaginateOption,
  fields?: PaginateOption,
  filter?: PaginateFilter,
  append?: PaginateOption,
  sort?: PaginateOption,
  page?: {
    number?: number | null,
    size?: number | null,
  },
}
