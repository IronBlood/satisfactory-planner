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
  parentCount?: number;
};

export const PressureHandleId = "PressureHandleId";

export default function PressureInOutHandle({
  handleType,
  nodeId,
  position,
  parentCount = 0,
}: PressureInOutHandleParams) {
  const connections = useNodeConnections({
    handleType,
    handleId: PressureHandleId,
    id: nodeId,
  });

  const maxConnections = useMemo(() => {
    if (handleType === "target")
      return 1;
    console.log(parentCount);
    return Math.ceil(parentCount) * 6;
  }, [handleType, parentCount]);

  const isConnectable = useMemo(() => {
    if (handleType === "target") {
      return connections.length < 1;
    }

    return true;
  }, [connections, handleType]);

  const bgColor = useMemo(() => {
    if (handleType === "target") {
      return connections.length === 1
        ? "pressure-handle-green"
        : "pressure-handle-red";
    } else {
      // FIXME this isn't accurate
      return connections.length <= maxConnections
        ? "pressure-handle-green"
        : "pressure-handle-yellow";
    }
  }, [handleType, connections, maxConnections]);

  const clazz = useMemo(() => [
    position === Position.Top ? "-mt-2" : "-mb-2",
    bgColor,
  ].join(" "), [position, bgColor]);

  return (
    <div
      className={clazz}
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
