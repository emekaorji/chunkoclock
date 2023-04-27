import {
  DependencyList,
  EffectCallback,
  useCallback,
  useEffect,
  useRef,
} from 'react';

const useDidUpdate = (
  effect: EffectCallback,
  dependencies?: DependencyList
) => {
  const hasMounted = useRef(false);

  const effectCallback = useCallback(effect, [effect]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const unsubscribe = effectCallback();

    return () => {
      if (!unsubscribe) return;
      unsubscribe();
    };
  }, [dependencies, effectCallback]);
};

export default useDidUpdate;
