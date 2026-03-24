import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import type {
  AppFlow,
  FlowEntry,
  MultiFlow,
  PartsCostMultiplier,
  PowerConsumptionMultiplier,
} from "./types";
import { AppNodeTypes } from "./flow/constants";
import type { Recipe } from "./data/recipes";

const CURR_VER = 3;

type DataAction =
  | { type: "importData"; data: MultiFlow }
  | { type: "setFilename"; filename: string }
  | { type: "addFlow"; flow?: FlowEntry }
  | { type: "deleteFlow"; index: number }
  | { type: "renameFlow"; index: number; name: string }
  | { type: "replaceFlow"; index: number; flow: AppFlow }
  | { type: "setPowerConsumptionMultiplier"; index: number; multiplier: PowerConsumptionMultiplier }
  | { type: "setPartsCostMultiplier"; index: number; multiplier: PartsCostMultiplier }
  ;

function dataReducer(state: MultiFlow, action: DataAction): MultiFlow {
  switch (action.type) {
    case "importData":
      upgradeData(action.data);
      return action.data;
    case "setFilename":
      return {
        ...state,
        filename: action.filename,
      };
    case "addFlow":
      return {
        ...state,
        flows: [
          ...state.flows,
          action.flow ?? getDefaultFlow(),
        ],
      };
    case "deleteFlow":
      return {
        ...state,
        flows: state.flows.filter((_, idx) => idx !== action.index),
      };
    case "renameFlow":
      return {
        ...state,
        flows: state.flows.map((entry, idx) =>
          idx === action.index
            ? { ...entry, name: action.name }
            : entry
        ),
      };
    case "replaceFlow":
      return {
        ...state,
        flows: state.flows.map((entry, idx) =>
          idx === action.index
            ? { ...entry, flow: action.flow }
            : entry
        ),
      };
    case "setPowerConsumptionMultiplier":
      return {
        ...state,
        flows: state.flows.map((entry, idx) =>
          idx === action.index
            ? {
              ...entry,
              powerConsumptionMultiplier: action.multiplier,
            }
            : entry
        ),
      };
    case "setPartsCostMultiplier":
      return {
        ...state,
        flows: state.flows.map((entry, idx) =>
          idx === action.index
            ? {
              ...entry,
              partsCostMultiplier: action.multiplier,
            }
            : entry
        ),
      };

    default:
      return state;
  }
}

export const PowerConsumptionMultipliers: PowerConsumptionMultiplier[] = [
  0.25,
  0.5,
  0.75,
  1,
  2,
  5,
] as const;

export const PartsCostMultipliers: PartsCostMultiplier[] = [
  0.25,
  0.5,
  0.75,
  1,
  1.25,
  1.5,
  1.75,
  2,
] as const;

type RenameFlowInput = { index: number; name: string };
type ReplaceFlowInput = { index: number; flow: AppFlow };
type SetPowerConsumptionMultiplierInput = { index: number; multiplier: PowerConsumptionMultiplier };
type SetPartsCostMultiplierInput = { index: number; multiplier: PartsCostMultiplier };
type DataContextValue = {
  data: MultiFlow;
  importData: (data: MultiFlow) => void;
  addFlow: (flow?: FlowEntry) => void;
  deleteFlow: (index: number) => void;
  renameFlow: (data: RenameFlowInput) => void;
  replaceFlow: (data: ReplaceFlowInput) => void;
  /** This API share the same flow of `replaceFlow` but doesn't commit the change */
  previewReplaceFlow: (data: ReplaceFlowInput) => MultiFlow;
  setFilename: (filename: string) => void;
  setPowerConsumptionMultiplier: (data: SetPowerConsumptionMultiplierInput) => void;
  setPartsCostMultiplier: (data: SetPartsCostMultiplierInput) => void;
};

const DataContext = createContext<DataContextValue | null>(null);

const DEFAULT_FLOW: FlowEntry = {
  name: "Unnamed Plan",
  powerConsumptionMultiplier: 1,
  partsCostMultiplier: 1,
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
  return structuredClone(DEFAULT_FLOW);
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, dispatch] = useReducer(dataReducer, {
    version: CURR_VER,
    filename: "",
    flows: [
      getDefaultFlow(),
    ],
  });

  const value: DataContextValue = useMemo(() => ({
    data,
    importData: (data) => dispatch({ type: "importData", data }),
    addFlow: (flow) => dispatch({ type: "addFlow", flow }),
    deleteFlow: (index) => dispatch({ type: "deleteFlow", index }),
    renameFlow: ({ index, name }) => dispatch({ type: "renameFlow", index, name }),
    replaceFlow: ({ index, flow }) => dispatch({ type: "replaceFlow", index, flow }),
    previewReplaceFlow: ({ index, flow }) => dataReducer(data, { type: "replaceFlow", index, flow }),
    setFilename: (filename) => dispatch({ type: "setFilename", filename }),
    setPowerConsumptionMultiplier: ({ index, multiplier }) => dispatch({ type: "setPowerConsumptionMultiplier", index, multiplier }),
    setPartsCostMultiplier: ({ index, multiplier }) => dispatch({ type: "setPartsCostMultiplier", index, multiplier }),
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

export function stripData(data: MultiFlow) {
  const striped: MultiFlow = {
    ...data,
    version: CURR_VER,
    filename: "",
    flows: data.flows.map(f => ({
      ...f,
      flow: {
        nodes: f.flow.nodes.map(node => {
          const dup = structuredClone(node);
          delete dup.dragging;
          delete dup.selected;
          return dup;
        }),
        edges: f.flow.edges.map(edge => {
          const dup = structuredClone(edge);
          delete dup.animated;
          delete dup.selected;
          return dup;
        }),
        viewport: structuredClone(f.flow.viewport),
      },
    })),
  };

  return striped;
}

export function upgradeData(data: Partial<MultiFlow> & {
  version: number;
}) {
  if (data.version === 1) {
    data.version = 2;
    // @ts-ignore used by v2
    data.powerConsumptionMultiplier = 1;
    // @ts-ignore used by v2
    data.partsCostMultiplier = 1;

    for (const entry of data.flows!) {
      for (const node of entry.flow.nodes) {
        if (node.type !== AppNodeTypes.Recipe) {
          continue;
        }

        node.data.recipe = (node.data.recipe as unknown as Recipe).name;
      }
    }
  }

  if (data.version === 2) {
    data.version = 3;
    for (const entry of data.flows!) {
      // @ts-ignore used by v2
      entry.powerConsumptionMultiplier = data.powerConsumptionMultiplier ?? 1;
      // @ts-ignore used by v2
      entry.partsCostMultiplier = data.partsCostMultiplier ?? 1;
    }
    // @ts-ignore used by v2
    delete data.powerConsumptionMultiplier;
    // @ts-ignore used by v2
    delete data.partsCostMultiplier;
  }
}
