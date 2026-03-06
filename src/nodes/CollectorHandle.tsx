import {
  Handle,
  Position,
} from "@xyflow/react";

export const AwesomeCollectorHandleId = "AwesomeCollectorHandle";

export default function AwesomeCollectorHandle() {
  return (
    <div
      className="-mt-2"
    >
      <Handle
        type="target"
        position={Position.Top}
        id={AwesomeCollectorHandleId}
      />
    </div>
  );
}
