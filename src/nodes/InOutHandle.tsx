import {
  useMemo,
} from "react";
import {
  Handle,
  Position,
  useStore,
} from "@xyflow/react";
import HandleImage from "@/components/HandleImage";
import type { ItemName } from "@/data/items";
import type { ConveyorEdgeType } from "./ConveyorEdge";
import NumericInput from "@/components/NumericInput";

export type InOutHandleParams = {
  handleType: "source" | "target";
  name: ItemName;
  nodeId: string;
  position: Position;
  value: number;
  isLocked: boolean;
  onCommit: (next: number) => void;
};

export default function InOutHandle({
  handleType,
  name,
  nodeId,
  position,
  value,
  isLocked,
  onCommit,
}: InOutHandleParams) {
  const sum = useStore((s) => {
    return s.edges.reduce((acc, e) => {
      const matches = handleType === "source"
        ? e.source === nodeId && e.sourceHandle === name
        : e.target === nodeId && e.targetHandle === name;

      if (!matches)
        return acc;

      const v = (e as ConveyorEdgeType).data?.value || 0;
      return acc + v;
    }, 0);
  });

  const spanStyle = useMemo(() => {
    if (sum === value) {
      return "bg-green-700";
    }

    if (handleType === "source") {
      return sum > value
        ? "bg-rose-900"
        : "bg-yellow-800"
    } else {
      return sum < value
        ? "bg-rose-900"
        : "bg-yellow-800"
    }
  }, [sum, value, handleType]);

  return (
    <div
      className={[
        "pointer-events-auto flex items-center",
        position === Position.Top
          ? "-mt-2 flex-col"
          : "-mb-2 flex-col-reverse"
      ].join(" ")}
    >
      <Handle
        type={handleType}
        position={position}
        id={name}
      >
        <HandleImage
          direction={position === Position.Top ? "DOWN" : "UP"}
          name={name}
        />
      </Handle>
      <div className="flex justify-center whitespace-nowrap text-xs font-thin gap-1">
        <NumericInput value={value} onCommit={onCommit} readonly={isLocked} />
        <span className={spanStyle}>({sum})</span>
      </div>
    </div>
  );
}
