import HandleImage from "@/components/HandleImage";
import {
  type ItemName,
} from "@/data/items";
import {
  Handle,
  Position,
} from "@xyflow/react";
import { clsx } from "clsx/lite";

export type PassthroughInOutHandleParams = {
  handleType: "source" | "target";
  name: ItemName;
  position: Position;
};

export function PassthroughInOutHandle({
  handleType,
  name,
  position,
}: PassthroughInOutHandleParams) {
  return (
    <div
      className={clsx(
        "pointer-events-auto",
        position === Position.Top && "-mt-2",
        position === Position.Bottom && "-mb-2",
        position === Position.Left && "-ml-2",
        position === Position.Right && "-mr-2",
      )}
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
    </div>
  );
}
