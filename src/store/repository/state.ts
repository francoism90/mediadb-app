import { RepositoryState } from 'src/interfaces/store'

function state (): RepositoryState {
  return {
    name: '',
    autoload: true,
    data: [],
    meta: {},
    options: [],
    updatedAt: null
  }
}

export default state
