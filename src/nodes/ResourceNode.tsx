import {
  memo,
  useMemo,
} from "react";
import {
  Handle,
  Position,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import {
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import { getItemImageByName, type ItemName } from "@/data/items";
import HandleImage from "@/components/HandleImage";

export type ResourceNodeType = Node<{
  name: ItemName,
  count: number;
}, "resource">;

export default memo((props: NodeProps<ResourceNodeType>) => {

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
          <button className="h-4 w-4 p-0.5 bg-slate-800 rounded-full transition text-slate-700 hover:text-slate-500"><LockOpenIcon /></button>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-evenly">
        <div className="pointer-events-auto -mb-2 flex flex-col-reverse items-center">
          <Handle
            type="source"
            position={Position.Bottom}
            id={props.data.name}
          >
            <HandleImage
              direction="UP"
              name={props.data.name}
            />
          </Handle>
        </div>
      </div>
    </div>
  );
});
