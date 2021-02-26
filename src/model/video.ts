import Model from './model'
import Tag from './tag'

export default class Video extends Model {
  resource () {
    return 'videos'
  }

  relations () {
    return {
      'relationships.tags': Tag
    }
  }
}
