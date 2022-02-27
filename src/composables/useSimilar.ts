// import { filter } from 'lodash';
// import { VideosResponse } from 'src/interfaces';
// import { api } from 'src/services/api';
// import { useStore } from 'src/store/videos/similar';
// import { computed } from 'vue';

// export const useSimilar = (id: string) => {
//   const store = useStore();

//   const sorters = [
//     { label: 'Relevance', value: 'relevance' },
//     { label: 'Trending', value: 'trending' },
//     { label: 'Most Recent', value: '-created_at' },
//     { label: 'Most Views', value: '-views' },
//     { label: 'Longest', value: '-duration' },
//     { label: 'Shortest', value: 'duration' },
//   ];

//   const initialize = () => store.reset();

//   const fetchNext = async () => {
//     if (!store.isFetchable) {
//       return;
//     }

//     const { data } = await api(store.links?.next || 'videos').get().json<VideosResponse>();

//     store.populate(data.value);
//   };

//   const fetchQuery = async () => {
//     if (!store.isQueryable) {
//       return;
//     }

//     const response = await all(`videos/similar/${id}`, store.params);

//     store.populate(response);
//   };

//   const fetch = async () => {
//     await fetchNext();
//     await fetchQuery();
//   };

//   const filters = computed(() => filter(store.params));

//   return {
//     initialize,
//     fetch,
//     filters,
//     sorters,
//     store,
//   };
// };
