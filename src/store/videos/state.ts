import {
  VideosState, VideosQuery, VideosMeta, VideosLinks, VideoModel,
} from 'src/interfaces/video';

function state(): VideosState {
  return {
    ready: false,
    id: null,
    query: <VideosQuery>{
      sort: 'recommended',
      'page[number]': 1,
      'page[size]': 12,
    },
    data: <VideoModel[]>[],
    meta: <VideosMeta>{},
    links: <VideosLinks>{},
  };
}

export default state;
