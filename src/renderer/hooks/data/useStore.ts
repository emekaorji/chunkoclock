import React, { useEffect, useMemo, useState } from 'react';

const useStore = <T>(
  key: string,
  defaultState: T | null = null
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const value: T = useMemo(() => {
    return window.electron.store.get(key) ?? defaultState;
  }, [defaultState, key]);

  const [state, setState] = useState<T>(value);

  useEffect(() => {
    window.electron.store.set(key, state);
  }, [key, state]);

  return [state, setState];
};

export default useStore;
