import {
  useEffect,
} from "react";
import {
  BaseEdge,
  getSmoothStepPath,
  useReactFlow,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";

import {
  AppEdgeTypes,
} from "@/flow/constants";

export type PressureEdgeType = Edge<{}, typeof AppEdgeTypes.Pressure>;

export function PressureEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
  sourcePosition,
  targetPosition,
}: EdgeProps<PressureEdgeType>) {
  const { setEdges } = useReactFlow();

  const [
    edgePath,
  ] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

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
    </>
  );
}
