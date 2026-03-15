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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateLeft,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

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
  outputDirection?: Direction;
};

function RotatableBaseNode({
  nodeId,
  children,
  isLocked,
  outputDirection = "DOWN",
}: RotatableProps) {
  const currIdx = useMemo(() => Directions.indexOf(outputDirection), [outputDirection]);
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
            direction: dir === "LEFT"
              ? rotateLeftDirection
              : rotateRightDirection
          },
        }
        : node
    ));
  }, [nodeId, outputDirection, setNodes]);

  return (
    <div
      className={clsx(
        "relative rounded-lg bg-slate-700 border-0",
        isLocked && "no-drag",
        outputDirection === "DOWN" && "flex flex-col",
        outputDirection === "RIGHT" && "flex flex-row",
        outputDirection === "UP" && "flex flex-col-reverse",
        outputDirection === "LEFT" && "flex flex-row-reverse",
      )}
    >
      <div
        className={clsx(
          "bg-slate-800 flex justify-evenly",
          outputDirection === "DOWN" && "h-6 rounded-t-lg",
          outputDirection === "RIGHT" && "w-6 rounded-l-lg flex-col",
          outputDirection === "UP" && "h-6 rounded-b-lg flex-row-reverse",
          outputDirection === "LEFT" && "w-6 rounded-r-lg flex-col-reverse",
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
          outputDirection === "DOWN" && "h-6 rounded-b-lg px-1",
          outputDirection === "RIGHT" && "w-6 rounded-r-lg flex-col-reverse py-1",
          outputDirection === "UP" && "h-6 rounded-t-lg flex-row-reverse px-1",
          outputDirection === "LEFT" && "w-6 rounded-l-lg flex-col py-1",
        )}
      >
        <div
          className={clsx(
            "flex",
            outputDirection === "RIGHT" && "flex-col-reverse",
            outputDirection === "UP" && "flex-row-reverse",
            outputDirection === "LEFT" && "flex-col",
          )}
        >
          <button
            className={clsx(
              "rounded-full text-slate-700 text-xs hover:text-slate-500 cursor-pointer"
            )}
          >
            <FontAwesomeIcon
              icon={faRotateLeft}
              onClick={() => rotate("LEFT")}
            />
          </button>
          <button
            className={clsx(
              "rounded-full text-slate-700 text-xs hover:text-slate-500 cursor-pointer"
            )}
          >
            <FontAwesomeIcon
              icon={faRotateRight}
              onClick={() => rotate("RIGHT")}
            />
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
          outputDirection === "DOWN" && "bottom-0 left-0 right-0",
          outputDirection === "RIGHT" && "top-0 bottom-0 right-0 flex-col",
          outputDirection === "UP" && "top-0 left-0 right-0 flex-row-reverse",
          outputDirection === "LEFT" && "top-0 bottom-0 left-0 flex-col-reverse",
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
