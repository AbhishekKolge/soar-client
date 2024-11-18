import { useEffect, useMemo, useRef } from "react";
import { DEBOUNCE_TIME } from "../constants";
import _debounce from "lodash/debounce";

export const useDebounce = (callback) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return _debounce(func, DEBOUNCE_TIME);
  }, []);

  return debouncedCallback;
};
