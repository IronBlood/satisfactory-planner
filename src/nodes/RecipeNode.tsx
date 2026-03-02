import {
  memo,
  useCallback,
  useEffect,
} from "react";
import {
  Position,
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import {
  type Recipe,
} from "../data/recipes";
import {
  Buildings,
} from "../data/buildings";
import NumericInput from "../components/NumericInput";
import InOutHandle from "./InOutHandle";
import OutputImage from "@/components/OutputImage";
import RateLocker from "@/components/RateLocker";

export type RecipeNodeType = Node<{
  recipe: Recipe;
  count: number;
  isLocked: boolean;
}, "recipe">;

export default memo((props: NodeProps<RecipeNodeType>) => {
  const { setNodes } = useReactFlow();
  const setCount = useCallback((next: number) => {
    setNodes((nds) => nds.map(n => n.id === props.id
      ? { ...n, data: { ...n.data, count: next } }
      : n
    ));
  }, [setNodes, props.id]);
  useEffect(() => {
    console.log("mounted", props);
  }, [props.id]);
  const { recipe } = props.data;
  const building = Buildings[recipe.building];
  return (
    <div className="relative rounded-lg bg-slate-700 border-0" style={{ minWidth: "80px" }}>
      <div className="flex h-6 justify-evenly rounded-t-lg bg-slate-800 pattern-lines-yellow-800">
        {recipe.inputs.map(rate => (
          <InOutHandle
            key={rate.name}
            nodeId={props.id}
            handleType="target"
            name={rate.name}
            position={Position.Top}
            value={rate.rate * props.data.count}
            isLocked={props.data.isLocked}
            onCommit={(next) => setCount(next / rate.rate)}
          />
        ))}
      </div>
      <div className="px-3 py-2">
        <div className="flex gap-3">
          <div className="flex shrink items-center">
            <img
              alt={recipe.building}
              loading="lazy"
              width="256"
              height="256"
              className="aspect-square w-10"
              src={building.image}
            />
          </div>
          <div className="flex-1">
            <div className="text-sm">{recipe.name}</div>
            <div className="text-xs text-gray-400">{building.name} x<NumericInput value={props.data.count} onCommit={(next) => setCount(next)} readonly={props.data.isLocked} /><span className="ml-6 font-light italic">({building.power * props.data.count} MW)</span></div>
          </div>
          <div className="shrink relative">
            <OutputImage outputs={recipe.outputs} showSecond={false} />
          </div>
        </div>
      </div>
      {/* Bottom background */}
      <div className="relative flex h-6 justify-evenly rounded-b-lg bg-slate-800 pattern-lines-yellow-800">
        <div className="absolute bottom-0 right-0 top-0 flex w-auto items-center gap-2 px-2">
          <RateLocker
            nodeId={props.id}
            isLocked={props.data.isLocked}
          />
        </div>
      </div>
      {/* Bottom handlers */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-evenly">
        {recipe.outputs.map(rate => (
          <InOutHandle
            key={rate.name}
            nodeId={props.id}
            handleType="source"
            name={rate.name}
            position={Position.Bottom}
            value={rate.rate * props.data.count}
            isLocked={props.data.isLocked}
            onCommit={(next) => setCount(next / rate.rate)}
          />
        ))}
      </div>
    </div>
  );
});
