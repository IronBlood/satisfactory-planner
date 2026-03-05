import {
  Handle,
  Position,
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
  return (
    <div
      className={position === Position.Top ? "-mt-2" : "-mb-2"}
    >
      <Handle
        type={handleType}
        position={position}
        id={PressureHandleId}
      />
    </div>
  );
}
