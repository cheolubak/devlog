import { loadingStore } from '@devlog/stores';
import { useSetAtom } from 'jotai';

export const useLoading = () => {
  const setLoading = useSetAtom(loadingStore);

  const handleShow = (view: string) => {
    setLoading((prev) => [...new Set([view, ...prev])]);
  };

  const handleHide = (view: string) => {
    setLoading((prev) => prev.filter((v) => v !== view));
  };

  const handleClear = () => {
    setLoading([]);
  };

  return {
    clear: handleClear,
    hide: handleHide,
    show: handleShow,
  };
};
