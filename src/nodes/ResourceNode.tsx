import {
  memo,
  useCallback,
  useMemo,
} from "react";
import {
  Position,
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { getItemImageByName, type ItemName } from "@/data/items";
import InOutHandle from "@/nodes/InOutHandle";
import BaseNode from "./BaseNode";

export type ResourceNodeType = Node<{
  name: ItemName;
  count: number;
  isLocked: boolean;
}, "resource">;

export default memo((props: NodeProps<ResourceNodeType>) => {
  const { setNodes } = useReactFlow();
  const setResource = useCallback((next: number) => {
    setNodes((nodes) => nodes.map(n => n.id === props.id
      ? { ...n, data: { ...n.data, count: next } }
      : n
    ));
  }, [props.id]);

  const image = useMemo(() => getItemImageByName(props.data.name), [props]);

  return (
    <BaseNode nodeId={props.id} isLocked={props.data.isLocked}>
      <BaseNode.Body>
        <div className="flex items-center gap-2">
          <img
            alt={props.data.name}
            loading="lazy"
            width="256"
            height="256"
            className="aspect-square w-10"
            src={image}
          />
          <div>
            <div>{props.data.name}</div>
            <div className="text-xs text-gray-500">Source:&nbsp;<span>{props.data.count}</span></div>
          </div>
        </div>
      </BaseNode.Body>
      <BaseNode.OutHandles>
        <InOutHandle
          nodeId={props.id}
          name={props.data.name}
          position={Position.Bottom}
          handleType="source"
          value={props.data.count}
          isLocked={props.data.isLocked}
          onCommit={(next) => setResource(next)}
        />
      </BaseNode.OutHandles>
    </BaseNode>
  );
});
