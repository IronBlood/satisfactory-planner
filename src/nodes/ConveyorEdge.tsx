import {
  useCallback,
} from "react";
import {
  getStraightPath,
  BaseEdge,
  EdgeLabelRenderer,
  type EdgeProps,
  type Edge,
  useReactFlow,
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
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({ sourceX, sourceY, targetX, targetY });
  const onCommit = useCallback((next: number) => {
    setEdges((edges) =>
      edges.map((e) => e.id === id
        ? { ...e, data: { value: next } }
        : e)
    );
  }, [id]);
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
            onCommit={onCommit}
          />
        </div> : <></>}
      </EdgeLabelRenderer>
    </>
  );
}
