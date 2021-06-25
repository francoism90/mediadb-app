import { initialize } from 'src/services/echo';

export default function useEcho() {
  const echo = initialize();

  return {
    echo,
  };
}
