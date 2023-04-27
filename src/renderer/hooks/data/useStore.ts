import React, { useEffect, useRef, useState } from 'react';

const useStore = <T>(
  key: string,
  defaultState: T | null = null
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(
    window.electron.store.get(key) ?? defaultState
  );
  const currentKey = useRef(key);

  useEffect(() => {
    let value: T;
    if (currentKey.current !== key) {
      value = window.electron.store.get(key);
      currentKey.current = key;
      setState(value);
    } else {
      value = state;
    }
    window.electron.store.set(key, value);
  }, [key, state]);

  return [state, setState];
};

export default useStore;
