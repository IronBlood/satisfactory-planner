import {
  type Node,
  type NodeProps,
} from "@xyflow/react";
import {
  BuildingNames,
} from "@/data/buildings";

export type SupportedBuildings =
  | typeof BuildingNames.AwesomeSink
  | typeof BuildingNames.ResourceWellPressurizer
  ;

export type BuildingNodeType = Node<{
  name: SupportedBuildings;
  count: number;
  isLocked: boolean;
}, "building">;

export default function BuildingNode(props: NodeProps<BuildingNodeType>) {
  return (
    <div
    >
      {props.data.name} - {props.data.count} - {props.data.isLocked}
    </div>
  );
}
