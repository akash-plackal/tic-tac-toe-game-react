import { useState, useEffect, useRef } from "react";

const useCustomStorageHook = (key, initialState = "") => {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) || initialState
  );

  const ref = useRef(key);

  useEffect(() => {
    ref.current !== key
      ? window.localStorage.removeItem(ref.current)
      : (ref.current = key);

    window.localStorage.setItem(key, JSON.stringify(state));
  }, [initialState, key, state]);

  return [state, setState];
};

export { useCustomStorageHook };
