import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useDataContext } from "./DataProvider";
import type { PartsCostMultiplier, PowerConsumptionMultiplier } from "./types";

type ActiveFlowContextValue = {
  activeIdx: number;
  powerConsumptionMultiplier: PowerConsumptionMultiplier;
  partsCostMultiplier: PartsCostMultiplier;
  setActiveIdx: (idx: number) => void;
  setPowerConsumptionMultiplier: (multiplier: PowerConsumptionMultiplier) => void;
  setPartsCostMultiplier: (multiplier: PartsCostMultiplier) => void;
};

const ActiveFlowContext = createContext<ActiveFlowContextValue | null>(null);

export function ActiveFlowContextProvider({ children }: { children: ReactNode }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const {
    data,
    setPartsCostMultiplier,
    setPowerConsumptionMultiplier,
  } = useDataContext();

  const {
    partsCostMultiplier,
    powerConsumptionMultiplier,
  } = useMemo(() => data.flows[activeIdx], [activeIdx, data.flows]);

  const value: ActiveFlowContextValue = useMemo(() => ({
    activeIdx,
    partsCostMultiplier,
    powerConsumptionMultiplier,
    setActiveIdx,
    setPartsCostMultiplier: (multiplier) => setPartsCostMultiplier({ index: activeIdx, multiplier }),
    setPowerConsumptionMultiplier: (multiplier) => setPowerConsumptionMultiplier({ index: activeIdx, multiplier }),
  }), [
    activeIdx,
    partsCostMultiplier,
    powerConsumptionMultiplier,
    setActiveIdx,
    setPartsCostMultiplier,
    setPowerConsumptionMultiplier,
  ]);

  return (
    <ActiveFlowContext.Provider value={value}>
      {children}
    </ActiveFlowContext.Provider>
  );
}

export function useActiveFlowDataContext() {
  const ctx = useContext(ActiveFlowContext);
  if (!ctx) {
    throw new Error("useActiveFlowDataContext must be used within <ActiveFlowContextProvider>");
  }
  return ctx;
}
