import {
  Handle,
  Position,
} from "@xyflow/react";

import {
  AppHandleTypes,
} from "@/flow/constants";

export function AwesomeSinkHandle() {
  return (
    <div
      className="-mt-2"
    >
      <Handle
        type="target"
        position={Position.Top}
        id={AppHandleTypes.AwesomeSink}
      />
    </div>
  );
}
