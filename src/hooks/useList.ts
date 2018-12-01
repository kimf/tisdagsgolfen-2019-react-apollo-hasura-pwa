import { useState } from "react";

export interface Actions<T> {
  set: (list: T[]) => void;
  push: (item: T) => void;
  filter: (fn: (value: T) => boolean) => void;
  sort: (fn?: (a: T, b: T) => number) => void;
}

const useList = <T>(initialList: T[] = []): [T[], Actions<T>] => {
  const [list, set] = useState<T[]>(initialList);

  return [
    list,
    {
      filter: (fn) => set(list.filter(fn)),
      push: (entry) => set([...list, entry]),
      set,
      sort: (fn?) => set([...list].sort(fn))
    }
  ];
};

export default useList;
