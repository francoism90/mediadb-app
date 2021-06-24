import { useStore } from 'src/store';
import videosModule from 'src/store/videos';

export default function useVideos(module: string) {
  const $store = useStore();

  if (!$store.hasModule(module)) {
    $store.registerModule(module, videosModule);
  }

  console.log($store.state.session.token);

  console.log($store.getters['session/isLoadable']);

  // console.log(capitalizeActors);

  // const { isLoadable } = useGetters<VideosGetters>(['isLoadable']);

  // const {
  // useState, useActions, useMutations,
  // } = createNamespacedHelpers(module);

  // const { id, query, data } = useState([
  //   'id',
  //   'query',
  //   'data',
  // ]);

  // const { isLoadable, nextPage } = useGetters<VideosGetters>([
  //   'isLoadable',
  //   'nextPage',
  // ]);

  // const { initialize, populate, repopulate } = useActions([
  //   'initialize',
  //   'populate',
  //   'repopulate',
  // ]);

  // const { setQuery } = useMutations([
  //   'setQuery',
  // ]);

  // const fetchAll = async (): Promise<void> => {
  //   const fetch = isLoadable.value as boolean;

  //   if (fetch) {
  //     const pageNumber = nextPage.value as number;
  //     const finalQuery = { ...query.value, ...{ 'page[number]': pageNumber } } as AxiosRequestConfig;

  //     const response = await all(finalQuery);
  //     await populate(response);
  //   }
  // };

  return {
    // fetchAll,
    // initialize,
    // repopulate,
    // setQuery,
    // isLoadable,
    // nextPage,
    // id,
    // query,
    // data,
  };
}
