import {
  getItemImageByName,
} from "@/data/items";
import {
  type Recipe,
} from "@/data/recipes";
import OutputImage from "@/components/OutputImage";

type RecipeViewType = {
  output_name: string;
  onClick: () => void;
} & ({
  image?: string;
  recipe?: never;
} | {
  image?: never;
  recipe?: Recipe;
});

export default function RecipeView({
  output_name,
  image,
  recipe,
  onClick,
}: RecipeViewType) {
  const isResourceOutput = recipe ? false : true;
  const outputImage = isResourceOutput
    ? <img
      src={image}
      alt={output_name}
      loading="lazy"
      width="256"
      height="256"
      className="inline-block aspect-square w-12"
    />
    : <OutputImage
      outputs={recipe!.outputs}
    />;
  const output_rate = isResourceOutput ? 0 : recipe!.outputs.find(x => x.name === output_name)!.rate;
  return (
    <div className={isResourceOutput ? "flex flex-col overflow-hidden rounded-lg bg-slate-700 cursor-pointer hover:bg-slate-800 transition duration-200 ease-in-out" : "rounded-lg bg-slate-700 p-2 transition duration-200 ease-in-out cursor-pointer hover:bg-slate-800"} onClick={onClick}>
      <div className={isResourceOutput ? "flex flex-1 gap-2 p-2" : "flex gap-2"}>
        <div className="relative w-16 shrink text-center">
          {outputImage}
        </div>
        <div className="flex-1">
          <div className="text-xs">{isResourceOutput ? output_name : recipe!.name}</div>
          <div className="text-sm text-gray-500">{recipe ? recipe.building : "Adjustable resource node"}</div>
        </div>
      </div>
      {isResourceOutput
        ? <div className="shrink bg-slate-900 text-center text-sm font-light text-slate-300">Resource output</div>
        : <div className="mt-2 flex gap-2">
          <div className="w-16 shrink text-center"><span className="text-xs leading-6">{output_rate} / m</span></div>
          <div className="grid flex-1 grid-cols-2">
            {recipe!.inputs.map((i) => (
              <div
                key={i.name}
                className="flex items-center text-xs"
              >
                <img
                  alt={i.name}
                  loading="lazy"
                  width="256"
                  height="256"
                  className="aspect-square w-6"
                  src={getItemImageByName(i.name)}
                />
                <span className="ml-1">{i.rate}</span>
              </div>
            ))}
          </div>
        </div>}
    </div>
  );
}
