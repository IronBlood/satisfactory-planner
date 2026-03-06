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
    flows: [{
      name: "Unnamed Plan",
      flow: {
        nodes: [],
        edges: [],
        viewport: {
          x: 0,
          y: 0,
          zoom: 1,
        },
      },
    }],
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

export function stripeData(data: MultiFlow) {
  const striped: MultiFlow = {
    version: CURR_VER,
    flows: data.flows.map(f => ({
      ...f,
      flow: {
        nodes: f.flow.nodes.map(node => {
          const dup = Object.assign({}, node);
          delete dup.dragging;
          delete dup.selected;
          return dup;
        }),
        edges: f.flow.edges.map(edge => {
          const dup = Object.assign({}, edge);
          delete edge.animated;
          delete edge.selected;
          return dup;
        }),
        viewport: Object.assign(f.flow.viewport),
      },
    })),
  };

  return striped;
}
