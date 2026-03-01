import {
  getStraightPath,
  BaseEdge,
  EdgeLabelRenderer,
  type EdgeProps,
  type Edge,
} from "@xyflow/react";
import NumericInput from "@/components/NumericInput";

export type ConveyorEdgeType = Edge<{ value: number }, "conveyor">;

export default function ConveyorEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}: EdgeProps<ConveyorEdgeType>) {
  console.log(data);
  const [edgePath, labelX, labelY] = getStraightPath({ sourceX, sourceY, targetX, targetY });
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        {data ? <div style={{
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          pointerEvents: "all",
        }}>
          <NumericInput
            value={data.value}
            onCommit={(next) => console.log(next)}
          />
        </div> : <></>}
      </EdgeLabelRenderer>
    </>
  );
}
