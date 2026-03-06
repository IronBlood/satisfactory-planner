import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  type MultiFlow,
} from "./types";

const CURR_VER = 1;

const DataContext = createContext<{
  data: MultiFlow;
  setData: (data: MultiFlow) => void;
} | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<MultiFlow>({
    version: CURR_VER,
    flows: [],
  });

  const value = useMemo(() => ({
    data,
    setData: ((data: MultiFlow) => {
      if (data.version !== CURR_VER) {
        // TODO
        throw new Error("data version mismatch");
      }

      setData(data);
    }),
  }), [data]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useDataContext must be used within <DataProvider>");
  }
  return ctx;
}
