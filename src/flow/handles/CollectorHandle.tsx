import {
  Handle,
  Position,
} from "@xyflow/react";

import { AppHandleTypes } from "@/flow/constants";

export function AwesomeCollectorHandle() {
  return (
    <div
      className="-mt-2"
    >
      <Handle
        type="target"
        position={Position.Top}
        id={AppHandleTypes.AwesomeCollector}
      />
    </div>
  );
}
