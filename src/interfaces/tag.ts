import {
  Model, RepositoryLinks, RepositoryMeta, RepositoryParameters,
} from 'src/interfaces/repository';

export type TagsMeta = RepositoryMeta
export type TagsLinks = RepositoryLinks

export interface TagModel extends Model {
  overview: string | null,
  type: string | null,
  items: number | null,
  views: number | null,
}

export interface TagResponse {
  data: TagModel,
  meta: null,
}

export interface TagsFilters {
  type: string | null
}

export interface TagsParameters extends RepositoryParameters {
  filter: TagsFilters
}

export interface TagsResponse {
  data: TagModel[],
  meta: TagsMeta,
  links: TagsLinks
}
