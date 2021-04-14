import { RepositoryState } from 'src/interfaces/store'

function state (): RepositoryState {
  return {
    name: '',
    id: null,
    autoload: true,
    timestamp: null,
    data: [],
    meta: {},
    options: []
  }
}

export default state
