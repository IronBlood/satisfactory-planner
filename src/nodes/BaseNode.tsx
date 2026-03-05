import {
  Children,
  isValidElement,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react";

import RateLocker from "@/components/RateLocker";

type Props = {
  children: ReactNode;
  isLocked: boolean;
  nodeId: string;
};

function InHandles({
  children,
}: {
  children: ReactNode;
}
) {
  return (
    <>
      {children}
    </>
  );
}

function Body({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}

function OutHandles({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}

function BaseNode({
  children,
  isLocked,
  nodeId,
}: Props) {
  const clazz = useMemo(() => isLocked
    ? "relative rounded-lg bg-slate-700 border-0 nodrag"
    : "relative rounded-lg bg-slate-700 border-0"
    , [isLocked]);

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

  return (
    <div
      className={clazz}
      style={{ minWidth: "80px" }}
    >
      <div className="flex h-6 justify-evenly rounded-t-lg bg-slate-800">
        {inHandles}
      </div>
      <div className="px-3 py-2">
        {body}
      </div>
      <div className="relative h-6 rounded-b-lg bg-slate-800">
        <div className="absolute bottom-0 right-0 top-0 w-auto items-center px-2">
          <RateLocker
            nodeId={nodeId}
            isLocked={isLocked}
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-evenly">
        {outHandles}
      </div>
    </div>
  );
}

BaseNode.InHandles = InHandles;
BaseNode.Body = Body;
BaseNode.OutHandles = OutHandles;

export default BaseNode;
