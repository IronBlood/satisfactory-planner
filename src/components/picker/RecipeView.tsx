import {
  getItemImageByName,
} from "@/data/items";
import {
  getRecipeByName,
  getCostByMultiplier,
} from "@/data/recipes";
import OutputImage from "@/components/OutputImage";
import { useDataContext } from "@/DataProvider";

type RecipeViewType = {
  output_name: string;
  onClick: () => void;
  activeRecipe: string | null;
  viewType: "recipe" | "source" | "passthrough";
} & ({
  image?: string;
  recipe?: never;
  viewType: "source" | "passthrough";
} | {
  image?: never;
  recipe?: string;
  viewType: "recipe";
});

export default function RecipeView({
  output_name,
  image,
  recipe,
  onClick,
  activeRecipe,
  viewType,
}: RecipeViewType) {
  const isResourceOutput = viewType === "source";
  const isPassthrough = viewType === "passthrough";
  const r = recipe ? getRecipeByName(recipe) : null;
  const {
    data,
  } = useDataContext();
  const outputImage = (isResourceOutput || isPassthrough)
    ? <img
      src={image}
      alt={output_name}
      loading="lazy"
      width="256"
      height="256"
      className="inline-block aspect-square w-12"
    />
    : <OutputImage
      outputs={r!.outputs}
    />;
  const [cycles_per_minute, output_amount] = (isResourceOutput || isPassthrough)
    ? [0, 0]
    : r
      ? [60 / r.duration, r?.outputs.find(x => x.name === output_name)?.amount ?? 0]
      : [0, 0];
  const output_rate = cycles_per_minute * output_amount;
  return (
    <div
      className={[
        "rounded-lg cursor-pointer hover:bg-slate-800 transition duration-200 ease-in-out",
        (isResourceOutput || isPassthrough) ? "flex flex-col overflow-hidden" : "p-2",
        ((isResourceOutput && activeRecipe?.endsWith(" - source")) || (isPassthrough && activeRecipe?.endsWith(" - passthrough")) || activeRecipe === recipe) ? "bg-slate-800 ring-1 ring-sky-500" : "bg-slate-700",
      ].join(" ")}
      onClick={onClick}
    >
      <div className={(isResourceOutput || isPassthrough) ? "flex flex-1 gap-2 p-2" : "flex gap-2"}>
        <div className="relative w-16 shrink text-center">
          {outputImage}
        </div>
        <div className="flex-1">
          <div className="text-xs">{(isResourceOutput || isPassthrough) ? output_name : r!.name}</div>
          <div className="text-sm text-gray-500">
            {
              r
                ? r.building
                : isResourceOutput
                  ? "Adjustable resource node"
                  : "Passthrough node"
            }
          </div>
        </div>
      </div>
      {isResourceOutput
        ? <div className="shrink bg-slate-900 text-center text-sm font-light text-slate-300">Resource output</div>
        : isPassthrough
          ? <div className="shrink bg-slate-900 text-center text-sm font-light text-slate-300">Passthrough</div>
          : <div className="mt-2 flex gap-2">
            <div className="w-16 shrink text-center">{output_rate > 0 && <span className="text-xs leading-6">{output_rate} / m</span>}</div>
            <div className="grid flex-1 grid-cols-2">
              {r!.inputs.map((i) => (
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
                  <span className="ml-1">{getCostByMultiplier(i.amount, data.partsCostMultiplier) * cycles_per_minute}</span>
                </div>
              ))}
            </div>
          </div>}
    </div>
  );
}
