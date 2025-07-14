import { DependencyList, useEffect, useRef } from "react";

export function useUpdateEffect(callback: () => void, deps: DependencyList = []) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
