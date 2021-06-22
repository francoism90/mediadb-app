export interface TagModel {
  id: string,
  overview: string | null,
  type: string | null,
  items: number | null,
  views: number | null,
}

export interface TagResponse {
  data: TagModel,
  meta: null,
}

export interface TagsMeta {
  'current_page'?: number,
  'last_page'?: number,
  'per_page'?: number,
  from?: number,
  path?: string,
  to?: number,
  total?: number,
}

export interface TagsLinks {
  first: string | null,
  last: string | null,
  next: string | null,
  prev: string | null,
}

export interface TagsParameters {
  include: string[] | null,
  fields: string[] | null,
  append: string[] | null,
  sort: string | string[] | null,
  'page[number]': number | null,
  'page[size]': number | null,
}

export interface TagsFilters {
  type: string | null
}

export interface TagsResponse {
  data: TagModel[],
  meta: TagsMeta,
  links: TagsLinks
}
