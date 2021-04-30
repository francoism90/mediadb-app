import {
  Model, ModelResponse, RepositoryMeta, RepositoryParams, RepositoryResponse,
} from './repository';

export interface Tag extends Model {
  overview?: string | null,
  type?: string | null,
  items?: number | null,
  views?: number | null,
}

export interface TagResponse extends ModelResponse {
  data: Tag,
  meta: null
}

export interface TagsResponse extends RepositoryResponse {
  data: Tag[],
  meta: RepositoryMeta
}

export interface TagsParameters extends RepositoryParams {
  'filter[query]'?: string | null
}
