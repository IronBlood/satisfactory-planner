import {
  Position,
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
import {
  AwesomeSinkHandle,
  PressureInOutHandle,
  AwesomeCollectorHandle,
} from "@/flow/handles";
import type { AppNodeTypes } from "../constants";
import { useDataContext } from "@/DataProvider";

export type SupportedBuildings =
  | typeof BuildingNames.AwesomeSink
  | typeof BuildingNames.ResourceWellPressurizer
  | typeof BuildingNames.AwesomeCollector
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

type AwesomeCollectorData = BaseBuildingData & {
  name: typeof BuildingNames.AwesomeCollector;
};

type BuildingData = AwesomeSinkData | RWPData | AwesomeCollectorData;

type AwesomeSinkNodePropsType = NodeProps<Node<AwesomeSinkData, typeof AppNodeTypes.Building>>;
type RWPNodePropsType = NodeProps<Node<RWPData, "building">>;
type AwesomeCollectorPropsType = NodeProps<Node<AwesomeCollectorData, "building">>;
export type BuildingNodeType = Node<BuildingData, "building">;
type BuildingNodePropsType = NodeProps<BuildingNodeType>;

function isAwesomeSinkNode(props: BuildingNodePropsType): props is AwesomeSinkNodePropsType {
  return props.data.name === BuildingNames.AwesomeSink;
}

function isResourceWellPressurizerNode(props: BuildingNodePropsType): props is RWPNodePropsType {
  return props.data.name === BuildingNames.ResourceWellPressurizer;
}

function isAwesomeCollectorNode(props: BuildingNodePropsType): props is AwesomeCollectorPropsType {
  return props.data.name === BuildingNames.AwesomeCollector;
}

function AwesomeSinkNode(props: AwesomeSinkNodePropsType) {
  const building = Buildings[BuildingNames.AwesomeSink];

  const {
    data,
  } = useDataContext();

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
      <BaseNode.InHandles>
        <AwesomeSinkHandle />
      </BaseNode.InHandles>
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
            <div className="text-xs text-gray-400">x<NumericInput value={props.data.count} onCommit={(next) => setCount(next)} readonly={props.data.isLocked} /><span className="ml-6 font-light italic">({building.power * props.data.count * data.powerConsumptionMultiplier} MW)</span></div>
          </div>
        </div>
      </BaseNode.Body>
    </BaseNode>
  );
}

function RWPNode(props: RWPNodePropsType) {
  const building = Buildings[BuildingNames.ResourceWellPressurizer];

  const {
    data,
  } = useDataContext();

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
      <BaseNode.OutHandles>
        <PressureInOutHandle
          handleType="source"
          nodeId={props.id}
          position={Position.Bottom}
          parentCount={props.data.count}
        />
      </BaseNode.OutHandles>
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
            <div className="text-xs text-gray-400">x<NumericInput value={props.data.count} onCommit={(next) => setCount(next)} readonly={props.data.isLocked} /><span className="ml-6 font-light italic">({building.power * props.data.count * data.powerConsumptionMultiplier} MW)</span></div>
          </div>
        </div>
      </BaseNode.Body>

    </BaseNode>
  );
}

function CollectorNode(props: AwesomeCollectorPropsType) {
  const building = Buildings[BuildingNames.AwesomeCollector];

  return (
    <BaseNode
      isLocked={props.data.isLocked}
      nodeId={props.id}
    >
      <BaseNode.InHandles>
        <AwesomeCollectorHandle />
      </BaseNode.InHandles>
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
            <div className="text-sm">AWESOME Collector</div>
            <div className="text-xs text-gray-400">non-existing</div>
          </div>
        </div>
      </BaseNode.Body>
    </BaseNode>
  );
}

export function BuildingNode(props: BuildingNodePropsType) {
  if (isAwesomeSinkNode(props)) {
    return AwesomeSinkNode(props);
  }

  if (isResourceWellPressurizerNode(props)) {
    return RWPNode(props);
  }

  if (isAwesomeCollectorNode(props)) {
    return CollectorNode(props);
  }

  throw new Error("TODO");
}
