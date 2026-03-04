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

type BaseBuildingData = {
  count: number;
  isLocked: boolean;
};

type AwesomeSinkData = BaseBuildingData & {
  name: typeof BuildingNames.AwesomeSink;
};

type RWPData = BaseBuildingData & {
  name: typeof BuildingNames.ResourceWellPressurizer;
};

type BuildingData = AwesomeSinkData | RWPData;

type AwesomeSinkNodePropsType = NodeProps<Node<AwesomeSinkData, "building">>;
export type BuildingNodeType = Node<BuildingData, "building">;
type BuildingNodePropsType = NodeProps<BuildingNodeType>;

function isAwesomeSinkNode(props: BuildingNodePropsType): props is AwesomeSinkNodePropsType {
  return props.data.name === BuildingNames.AwesomeSink;
}

function AwesomeSinkNode(props: AwesomeSinkNodePropsType) {
  return (
    <div
    >
      {props.data.name} - {props.data.count} - {props.data.isLocked}
    </div>
  );
}

export default function BuildingNode(props: BuildingNodePropsType) {
  if (isAwesomeSinkNode(props)) {
    return AwesomeSinkNode(props);
  }

  throw new Error("TODO");
}
