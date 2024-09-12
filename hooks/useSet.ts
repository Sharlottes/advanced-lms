import { useCallback, useReducer, useRef } from "react";

export default function useSet<T>(initialValue?: T[]) {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const set = useRef(new Set<T>(initialValue));

  const add = useCallback(
    (item: T) => {
      if (set.current.has(item)) return;
      forceUpdate();
      set.current.add(item);
    },
    [forceUpdate]
  );

  const remove = useCallback(
    (item: T) => {
      if (!set.current.has(item)) return;
      forceUpdate();
      set.current.delete(item);
    },
    [forceUpdate]
  );

  return [set.current, add, remove] as const;
}
