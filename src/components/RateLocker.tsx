import { useCallback } from "react";
import {
  useReactFlow,
} from "@xyflow/react";
import {
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";
import {
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";

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
        "h-4 w-4 p-0.5 bg-slate-800 rounded-full transition text-xs duration-200",
        isLocked
          ? "text-yellow-700 hover:text-yellow-500"
          : "text-slate-700 hover:text-slate-500"
      ].join(" ")}
      onClick={toggle}
    >
      <FontAwesomeIcon
        icon={isLocked ? faLock : faLockOpen}
      />
    </button>
  );
}
