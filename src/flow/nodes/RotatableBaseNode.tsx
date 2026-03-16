import {
  Children,
  isValidElement,
  useCallback,
  useMemo,
  type ReactElement,
} from "react";
import {
  useReactFlow,
} from "@xyflow/react";
import { clsx } from "clsx/lite";
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/outline";

import {
  InHandles,
  Body,
  OutHandles,
  type Props,
} from "./BaseNode";
import RateLocker from "@/components/RateLocker";

export type Direction = "DOWN" | "RIGHT" | "UP" | "LEFT";

const Directions: Direction[] = [
  "DOWN",
  "RIGHT",
  "UP",
  "LEFT",
];

type RotatableProps = Props & {
  outputOrientation?: Direction;
};

function RotatableBaseNode({
  nodeId,
  children,
  isLocked,
  outputOrientation = "DOWN",
}: RotatableProps) {
  const currIdx = useMemo(() => Directions.indexOf(outputOrientation), [outputOrientation]);
  const rotateLeftDirection = useMemo(() => Directions[(currIdx + 1) % 4], [currIdx]);
  const rotateRightDirection = useMemo(() => Directions[(currIdx + 3) % 4], [currIdx]);

  const {
    setNodes,
  } = useReactFlow();

  const {
    inHandles,
    body,
    outHandles,
  } = useMemo(() => {
    const arr = Children.toArray(children);

    const inHandles = arr.find(c => isValidElement(c) && c.type === InHandles) as ReactElement || (<></>);

    const body = arr.find(c => isValidElement(c) && c.type === Body) as ReactElement || (<></>);

    const outHandles = arr.find(c => isValidElement(c) && c.type === OutHandles) as ReactElement || (<></>);

    return {
      inHandles,
      body,
      outHandles,
    };
  }, [children]);

  const rotate = useCallback((dir: "LEFT" | "RIGHT") => {
    setNodes((nodes) => nodes.map(
      node => node.id === nodeId
        ? {
          ...node,
          data: {
            ...node.data,
            orientation: dir === "LEFT"
              ? rotateLeftDirection
              : rotateRightDirection
          },
        }
        : node
    ));
  }, [nodeId, outputOrientation, setNodes]);

  return (
    <div
      className={clsx(
        "relative rounded-lg bg-slate-700 border-0",
        isLocked && "no-drag",
        outputOrientation === "DOWN" && "flex flex-col",
        outputOrientation === "RIGHT" && "flex flex-row",
        outputOrientation === "UP" && "flex flex-col-reverse",
        outputOrientation === "LEFT" && "flex flex-row-reverse",
      )}
    >
      <div
        className={clsx(
          "bg-slate-800 flex justify-evenly",
          outputOrientation === "DOWN" && "h-6 rounded-t-lg",
          outputOrientation === "RIGHT" && "w-6 rounded-l-lg flex-col",
          outputOrientation === "UP" && "h-6 rounded-b-lg flex-row-reverse items-end",
          outputOrientation === "LEFT" && "w-6 rounded-r-lg flex-col-reverse items-end",
        )}
      >
        {inHandles}
      </div>
      <div className="px-3 py-2">
        {body}
      </div>
      <div
        className={clsx(
          "bg-slate-800 flex items-center justify-between",
          outputOrientation === "DOWN" && "h-6 rounded-b-lg px-1",
          outputOrientation === "RIGHT" && "w-6 rounded-r-lg flex-col-reverse py-1",
          outputOrientation === "UP" && "h-6 rounded-t-lg flex-row-reverse px-1",
          outputOrientation === "LEFT" && "w-6 rounded-l-lg flex-col py-1",
        )}
      >
        <div
          className={clsx(
            "flex",
            outputOrientation === "RIGHT" && "flex-col-reverse",
            outputOrientation === "UP" && "flex-row-reverse",
            outputOrientation === "LEFT" && "flex-col",
          )}
        >
          <button
            className={clsx(
              "h-4 w-4 rounded-full text-slate-700 text-xs hover:text-slate-500 cursor-pointer"
            )}
            onClick={() => rotate("LEFT")}
          >
            <ArrowUturnLeftIcon />
          </button>
          <button
            className={clsx(
              "h-4 w-4 rounded-full text-slate-700 text-xs hover:text-slate-500 cursor-pointer"
            )}
            onClick={() => rotate("RIGHT")}
          >
            <ArrowUturnRightIcon />
          </button>
        </div>

        <div className="items-center">
          <RateLocker
            nodeId={nodeId}
            isLocked={isLocked}
            className="items-center"
          />
        </div>
      </div>
      <div
        className={clsx(
          "absolute flex items-end justify-evenly",
          outputOrientation === "DOWN" && "bottom-0 left-0 right-0",
          outputOrientation === "RIGHT" && "top-0 bottom-0 right-0 flex-col",
          outputOrientation === "UP" && "top-0 left-0 right-0 flex-row-reverse",
          outputOrientation === "LEFT" && "top-0 bottom-0 left-0 flex-col-reverse",
        )}
      >
        {outHandles}
      </div>
    </div>
  );
}

RotatableBaseNode.InHandles = InHandles;
RotatableBaseNode.Body = Body;
RotatableBaseNode.OutHandles = OutHandles;

export default RotatableBaseNode;
