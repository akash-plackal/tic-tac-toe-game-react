import { useState, useEffect } from "react";

const useCustomStorageHook = (key, initialState = "") => {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) || initialState
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [initialState, key, state]);

  return [state, setState];
};

export { useCustomStorageHook };
