import { RepositoryState } from 'src/interfaces/store'

function state (): RepositoryState {
  return {
    id: null,
    data: [],
    meta: {},
    options: []
  }
}

export default state
