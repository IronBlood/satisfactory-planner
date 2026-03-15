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

export type MultiFlow = {
  /** Has to be an integer */
  version: number;
  filename: string;
  flows: Array<{
    name: string;
    flow: AppFlow;
  }>;
};
