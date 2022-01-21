import { useQuasar } from 'quasar';

export const useDarkMode = () => {
  const $q = useQuasar();

  const getMode = () => $q.dark.isActive;

  const setMode = (payload: boolean) => $q.dark.set(payload);

  const toggleMode = () => $q.dark.toggle();

  return {
    getMode,
    setMode,
    toggleMode,
  };
};
