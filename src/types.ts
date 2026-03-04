import type { BuildingNodeType } from "@/nodes/BuildingNode";
import type { ResourceNodeType } from "@/nodes/ResourceNode";
import type { RecipeNodeType } from "@/nodes/RecipeNode";

export type AppNode =
  | ResourceNodeType
  | RecipeNodeType
  | BuildingNodeType
  ;
