import { useCallback } from "react";
import {
  useReactFlow,
} from "@xyflow/react";
import {
  LockOpenIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function RateLocker({
  nodeId,
  isLocked,
}: {
  nodeId: string;
  isLocked: boolean;
}) {
  const { setNodes } = useReactFlow();
  const toggle = useCallback(() => {
    setNodes((nodes) => nodes.map(node => node.id === nodeId
      ? { ...node, data: { ...node.data, isLocked: !node.data.isLocked } }
      : node));
  }, [nodeId]);

  return (
    <button
      className={[
        "h-4 w-4 p-0.5 bg-slate-800 rounded-full transition",
        isLocked
          ? "text-yellow-700 hover:text-yellow-500"
          : "text-slate-700 hover:text-slate-500"
      ].join(" ")}
      onClick={toggle}
    >
      {isLocked ? <LockClosedIcon /> : <LockOpenIcon />}
    </button>
  );
}
