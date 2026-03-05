import {
  Handle,
  Position,
} from "@xyflow/react";

export const AwesomeSinkHandleId = "AwesomeSinkHandle";

export default function AwesomeSinkHandle() {
  return (
    <div
      className="-mt-2"
    >
      <Handle
        type="target"
        position={Position.Top}
        id={AwesomeSinkHandleId}
      />
    </div>
  );
}
