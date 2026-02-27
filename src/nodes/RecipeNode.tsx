import {
  memo,
  useEffect,
} from "react";
import {
  Handle,
  Position,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import {
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  type Recipe,
} from "../data/recipes";
import {
  Buildings,
} from "../data/buildings";
import HandleImage from "../components/HandleImage";

export type RecipeNodeType = Node<{
  recipe: Recipe;
}, "recipe">;

export default memo((props: NodeProps<RecipeNodeType>) => {
  useEffect(() => {
    console.log("mounted", props);
  }, [props.id]);
  const { recipe } = props.data;
  const building = Buildings[recipe.building];
  return (
    <div className="relative rounded-lg bg-slate-700 border-0" style={{ minWidth: "80px" }}>
      <div className="flex h-6 justify-evenly rounded-t-lg bg-slate-800 pattern-lines-yellow-800">
        {recipe.inputs.map(rate => (
          <div
            className="pointer-events-auto -mt-2 flex flex-col items-center"
            key={rate.name}
          >
            <Handle
              type="target"
              position={Position.Top}
              id={rate.name}
            >
              <HandleImage
                direction="DOWN"
                name={rate.name}
              />
            </Handle>
            <div className="flex max-w-4 justify-center whitespace-nowrap text-xs font-thin">{rate.rate}</div>
          </div>
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
            <div className="text-xs text-gray-400">{building.name}<span className="ml-6 font-light italic">({building.power} MW)</span></div>
          </div>
          <div className="shrink relative">
            {/*<OutputImage outputs={recipe.outputs} />*/}
          </div>
        </div>
      </div>
      {/* Bottom background */}
      <div className="relative flex h-6 justify-evenly rounded-b-lg bg-slate-800 pattern-lines-yellow-800">
        <div className="absolute bottom-0 left-0 top-0 flex w-auto items-center gap-2 px-2">
          <div className="group relative contents text-xs">
            <button className="h-4 w-4 p-px bg-slate-800 rounded-full transition text-slate-700 hover:text-slate-500"><CheckCircleIcon /></button>
          </div>
        </div>
      </div>
      {/* Bottom handlers */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-evenly">
        {recipe.outputs.map(rate => (
          <div
            key={rate.name}
            className="pointer-events-auto -mb-2 flex flex-col-reverse items-center"
          >
            <Handle
              type="source"
              position={Position.Bottom}
              id={rate.name}
            >
              <HandleImage
                direction="UP"
                name={rate.name}
              />
            </Handle>
            <div className="flex max-w-4 justify-center whitespace-nowrap text-xs font-thin">{rate.rate}</div>
          </div>
        ))}
      </div>
    </div>
  );
});
