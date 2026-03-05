import {
  useMemo,
} from "react";
import {
  Handle,
  Position,
  useNodeConnections,
} from "@xyflow/react";

export type PressureInOutHandleParams = {
  handleType: "source" | "target";
  nodeId: string;
  position: Position;
};

export const PressureHandleId = "PressureHandleId";

export default function PressureInOutHandle({
  handleType,
  nodeId,
  position,
}: PressureInOutHandleParams) {
  const connections = useNodeConnections({
    handleType,
    handleId: PressureHandleId,
    id: nodeId,
  });

  const isConnectable = useMemo(() => {
    if (handleType === "target") {
      return connections.length < 1;
    }

    return true;
  }, [connections, handleType]);

  return (
    <div
      className={position === Position.Top ? "-mt-2" : "-mb-2"}
    >
      <Handle
        type={handleType}
        position={position}
        id={PressureHandleId}
        isConnectable={isConnectable}
      />
    </div>
  );
}
