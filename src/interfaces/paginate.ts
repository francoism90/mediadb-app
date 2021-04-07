export interface PaginateFilter {
  [key: string]: string | number | null
}

export interface PaginateEntity {
  id: string | number,
  uuid?: string | number | null,
  slug?: string | number | null,
  name?: string | number | null,
  description?: string | null,
  'created_at'?: Date | null,
  'updated_at'?: Date | null,
}

export interface PaginateData {
  [index: number]: PaginateEntity[]
}

export interface PaginateMeta {
  'current_page': number,
  'last_page': number,
  'per_page': number,
  from: number,
  path: string,
  to: number,
  total: number,
}
