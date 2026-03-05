import {
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import {
  BuildingNames,
  Buildings,
} from "@/data/buildings";
import BaseNode from "./BaseNode";
import NumericInput from "@/components/NumericInput";
import { useCallback } from "react";

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
  const building = Buildings["AWESOME Sink"];

  const { setNodes } = useReactFlow();
  const setCount = useCallback((next: number) => {
    setNodes((nodes) => nodes.map(
      node => node.id === props.id
        ? { ...node, data: { ...node.data, count: next } }
        : node
    ));
  }, [setNodes, props.id]);

  return (
    <BaseNode
      isLocked={props.data.isLocked}
      nodeId={props.id}
    >
      <BaseNode.Body>
        <div className="flex gap-3">
          <div className="shrink items-center">
            <img
              alt={building.name}
              width="256"
              height="256"
              className="aspect-square w-10"
              src={building.image}
            />
          </div>
          <div className="flex-1">
            <div className="text-sm">{building.name}</div>
            <div className="text-xs text-gray-400">x<NumericInput value={props.data.count} onCommit={(next) => setCount(next)} readonly={props.data.isLocked} /><span className="ml-6 font-light italic">({building.power * props.data.count} MW)</span></div>
          </div>
        </div>
      </BaseNode.Body>
    </BaseNode>
  );
}

export default function BuildingNode(props: BuildingNodePropsType) {
  if (isAwesomeSinkNode(props)) {
    return AwesomeSinkNode(props);
  }

  throw new Error("TODO");
}
