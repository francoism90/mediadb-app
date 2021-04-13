import { RepositoryState } from 'src/interfaces/store'

function state (): RepositoryState {
  return {
    id: null,
    autoload: true,
    data: [],
    meta: {},
    options: []
  }
}

export default state
