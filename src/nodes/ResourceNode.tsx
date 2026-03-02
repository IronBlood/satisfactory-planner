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
import RateLocker from "@/components/RateLocker";

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
    <div
      className="relative rounded-lg bg-slate-700 border-0"
      style={{ minWidth: "80px" }}
    >
      <div className="px-3 pt-4 pb-2">
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
      </div>
      <div className="relative flex h-6 justify-evenly rounded-b-lg bg-slate-800">
        <div className="absolute bottom-0 right-0 top-0 flex w-auto items-center gap-2 px-2">
          <RateLocker
            nodeId={props.id}
            isLocked={props.data.isLocked}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-evenly">
        <InOutHandle
          nodeId={props.id}
          name={props.data.name}
          position={Position.Bottom}
          handleType="source"
          value={props.data.count}
          onCommit={(next) => setResource(next)}
        />
      </div>
    </div>
  );
});
