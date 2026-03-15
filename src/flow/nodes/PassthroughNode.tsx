import {
  memo,
  useMemo,
} from "react";
import {
  Position,
  useStore,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { clsx } from "clsx/lite";
import type { AppNodeTypes } from "../constants";
import {
  getItemImageByName,
  type ItemName,
} from "@/data/items";
import RotatableBaseNode, {
  type Direction,
} from "./RotatableBaseNode";
import type { ConveyorEdgeType } from "../edges";
import {
  PassthroughInOutHandle,
} from "../handles";

export type PassthroughNodeType = Node<{
  name: ItemName;
  isLocked: boolean;
  orientation?: Direction;
}, typeof AppNodeTypes.Passthrough>;

const EPSILON = 0.00001;

export const PassthroughNode = memo((props: NodeProps<PassthroughNodeType>) => {
  const {
    resIn,
    resOut,
  } = useStore((state) => {
    let resIn = 0, resOut = 0;

    for (const edge of state.edges) {
      if (edge.source === props.id) {
        resOut += (edge as ConveyorEdgeType).data?.value || 0;
      } else if (edge.target === props.id) {
        resIn += (edge as ConveyorEdgeType).data?.value || 0;
      }
    }

    return {
      resIn,
      resOut,
    }
  });

  const [
    posIn,
    posOut,
  ] = useMemo<Position[]>(() => {
    switch (props.data.orientation) {
      case "RIGHT":
        return [Position.Left, Position.Right];
      case "UP":
        return [Position.Bottom, Position.Top];
      case "LEFT":
        return [Position.Right, Position.Left];
      case "DOWN":
      default:
        return [Position.Top, Position.Bottom];
    }
  }, [props.data.orientation]);

  const image = useMemo(() => getItemImageByName(props.data.name), [props]);

  const remain = useMemo(() => {
    const raw = resIn - resOut;

    if (Math.abs(raw) < EPSILON) {
      return 0;
    }

    const int = raw | 0;

    if (Math.abs(int - raw) < EPSILON) {
      return int;
    }

    return +raw.toFixed(2);
  }, [resIn, resOut]);

  const spanStyle = useMemo(() => {
    if (remain === 0) {
      return "bg-green-700";
    }

    return remain > 0
      ? "bg-yellow-800"
      : "bg-rose-900"
  }, [remain]);

  return (
    <RotatableBaseNode
      nodeId={props.id}
      isLocked={props.data.isLocked}
      outputOrientation={props.data.orientation}
    >
      <RotatableBaseNode.InHandles>
        <PassthroughInOutHandle
          name={props.data.name}
          position={posIn}
          handleType="target"
        />
      </RotatableBaseNode.InHandles>
      <RotatableBaseNode.Body>
        <div className="flex items-center gap-2">
          <img
            alt={props.data.name}
            loading="lazy"
            className="aspect-square w-10"
            src={image}
          />
          <div>
            <div>{props.data.name}</div>
            <div className="text-xs text-gray-500">Passthrough<span className={clsx("ml-1 px-0.5 text-white", spanStyle)}>{remain}</span></div>
          </div>
        </div>
      </RotatableBaseNode.Body>
      <RotatableBaseNode.OutHandles>
        <PassthroughInOutHandle
          name={props.data.name}
          position={posOut}
          handleType="source"
        />
      </RotatableBaseNode.OutHandles>
    </RotatableBaseNode>
  );
});
