import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  type AppFlow,
  type MultiFlow,
} from "./types";

const CURR_VER = 1;

const DataContext = createContext<{
  data: MultiFlow;
  setData: (data: MultiFlow) => void;
} | null>(null);

const DEFAULT_FLOW: {
  name: string;
  flow: AppFlow;
} = {
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
} as const;

export function getDefaultFlow() {
  return Object.assign({}, DEFAULT_FLOW);
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<MultiFlow>({
    version: CURR_VER,
    flows: [
      getDefaultFlow(),
    ],
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
          delete dup.animated;
          delete dup.selected;
          return dup;
        }),
        viewport: Object.assign(f.flow.viewport),
      },
    })),
  };

  return striped;
}
