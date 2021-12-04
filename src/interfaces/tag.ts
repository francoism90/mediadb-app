import { Model, RepositoryParams, RepositoryResponse } from 'src/interfaces';

export interface TagModel extends Model {
  name: string,
  type: string,
  items?: number,
}

export interface TagsParams extends RepositoryParams {
  type?: string | string[] | null,
}

export interface TagsState extends RepositoryResponse {
  id: string | number | null,
  params: TagsParams,
}
