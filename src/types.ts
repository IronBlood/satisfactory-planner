import type {
  BuildingNodeType,
  PassthroughNodeType,
  RecipeNodeType,
  ResourceNodeType,
} from "@/flow/nodes";
import type {
  ConveyorEdgeType,
  PressureEdgeType,
} from "@/flow/edges";

export type AppNode =
  | ResourceNodeType
  | RecipeNodeType
  | BuildingNodeType
  | PassthroughNodeType
  ;

export type AppEdge =
  | ConveyorEdgeType
  | PressureEdgeType
;

/**
 * A single flow, which can be used by xyflow directly
 */
export type AppFlow = {
  nodes: AppNode[];
  edges: AppEdge[];
  viewport: {
    x: number;
    y: number;
    zoom: number;
  };
}

export type PowerConsumptionMultiplier =
  | 0.25
  | 0.5
  | 1
  | 0.75
  | 2
  | 5
  ;
export type PartsCostMultiplier =
  | 0.25
  | 0.5
  | 0.75
  | 1
  | 1.25
  | 1.5
  | 1.75
  | 2
  ;

export type FlowEntry = {
  name: string;
  flow: AppFlow;
};

export type MultiFlow = {
  /** Has to be an integer */
  version: number;
  filename: string;
  powerConsumptionMultiplier: PowerConsumptionMultiplier;
  partsCostMultiplier: PartsCostMultiplier;
  flows: FlowEntry[];
};
