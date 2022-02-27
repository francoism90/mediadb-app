// import { useLoading } from 'src/composables/useLoading';
// import { ResponseError } from 'src/interfaces';
// import { find } from 'src/services/api';

// export const useRoulette = () => {
//   const { state, startLoading, stopLoading } = useLoading();

//   const fetch = async () => find('videos/roulette/random');

//   const initialize = async () => {
//     startLoading();

//     try {
//       const response = await fetch();

//       return response;
//     } catch (e: unknown) {
//       const error = e as ResponseError;

//       if (error.response) {
//         stopLoading(error.response.data);
//       }

//       throw error;
//     } finally {
//       stopLoading();
//     }
//   };

//   return {
//     state,
//     initialize,
//     fetch,
//   };
// };
