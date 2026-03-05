import {
  memo,
  useCallback,
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
  BuildingNames,
  Buildings,
} from "../data/buildings";
import NumericInput from "../components/NumericInput";
import InOutHandle from "./InOutHandle";
import OutputImage from "@/components/OutputImage";
import BaseNode from "./BaseNode";
import PressureInOutHandle from "./PressureInOutHandle";

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
  const { recipe } = props.data;
  const building = Buildings[recipe.building];
  return (
    <BaseNode
      isLocked={props.data.isLocked}
      nodeId={props.id}
    >
      <BaseNode.InHandles>
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
        {recipe.building === BuildingNames.ResourceWellExtractor && (
          <PressureInOutHandle
            handleType="target"
            nodeId={props.id}
            position={Position.Top}
          />
        )}
      </BaseNode.InHandles>
      <BaseNode.Body>
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
      </BaseNode.Body>
      <BaseNode.OutHandles>
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
      </BaseNode.OutHandles>
    </BaseNode>
  );
});
