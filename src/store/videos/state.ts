import {
  VideosState, VideosParameters, VideosMeta, VideosLinks, VideoModel,
} from 'src/interfaces/video';

function state(): VideosState {
  return {
    ready: false,
    id: null,
    parameters: <VideosParameters>{},
    items: <VideoModel[]>[],
    meta: <VideosMeta>{},
    links: <VideosLinks>{},
  };
}

export default state;
