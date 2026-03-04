import {
  useCallback,
  useEffect,
} from "react";
import {
  getSimpleBezierPath,
  BaseEdge,
  EdgeToolbar,
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
  selected,
}: EdgeProps<ConveyorEdgeType>) {
  const { setEdges } = useReactFlow();
  const [edgePath, centerX, centerY] = getSimpleBezierPath({ sourceX, sourceY, targetX, targetY });
  const onCommit = useCallback((next: number) => {
    setEdges((edges) =>
      edges.map((e) => e.id === id
        ? { ...e, data: { ...e.data, value: next } }
        : e)
    );
  }, [id]);
  useEffect(() => {
    setEdges((edges) =>
      edges.map((e) => e.id === id
        ? { ...e, animated: selected }
        : e
      )
    );
  }, [id, selected]);
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeToolbar edgeId={id} x={centerX} y={centerY} isVisible>
        {data
          ? <div className="rounded-full inline-flex items-center border border-slate-500 bg-slate-700 px-2 py-0.5"><NumericInput
            value={data.value}
            onCommit={onCommit}
            textRight
          /> <span className="mx-2">/</span> min</div>
          : <></>}
      </EdgeToolbar>
    </>
  );
}
