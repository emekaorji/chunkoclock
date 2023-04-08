/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useCallback, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: Event) => void,
  dependencies = []
) => {
  const handlerCallback = useCallback(
    (event: Event) => {
      handler(event);
    },
    [handler, ...dependencies]
  );

  useEffect(() => {
    const listener = (event: Event) => {
      // @ts-ignore
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handlerCallback(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handlerCallback]);
};

export default useOnClickOutside;
