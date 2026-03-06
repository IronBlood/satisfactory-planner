import type { BuildingNodeType } from "@/nodes/BuildingNode";
import type { ResourceNodeType } from "@/nodes/ResourceNode";
import type { RecipeNodeType } from "@/nodes/RecipeNode";
import type { ConveyorEdgeType } from "./nodes/ConveyorEdge";
import type { PressureEdgeType } from "./nodes/PressureEdge";

export type AppNode =
  | ResourceNodeType
  | RecipeNodeType
  | BuildingNodeType
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
