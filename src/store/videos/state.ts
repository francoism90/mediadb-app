import {
  VideosState, VideosParameters, VideosFilters, VideosMeta, VideosLinks, VideoModel,
} from 'src/interfaces/video';

function state(): VideosState {
  return {
    ready: false,
    id: null,
    parameters: <VideosParameters>{},
    filters: <VideosFilters>{},
    items: <VideoModel[]>[],
    meta: <VideosMeta>{},
    links: <VideosLinks>{},
  };
}

export default state;
