/* eslint-disable no-redeclare */
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

function useStore<S>(
  _key: string,
  _initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];
function useStore<S = undefined>(
  _key: string
): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

function useStore<S = undefined>(
  key: string,
  initialState?: S | (() => S)
): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const [state, setState] = useState(
    (window.electron.store.get(key) as S) ?? initialState
  );
  const currentKey = useRef(key);

  useEffect(() => {
    let value: S | undefined;
    if (currentKey.current !== key) {
      value = window.electron.store.get(key);
      currentKey.current = key;
      setState(value ?? initialState);
    } else {
      value = state;
    }
    window.electron.store.set(key, value);
  }, [initialState, key, state]);

  return [state, setState];
}

export default useStore;
