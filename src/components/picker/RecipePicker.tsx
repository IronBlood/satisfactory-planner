import {
  useState,
  useMemo,
} from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  getItemImageByName,
  type ItemName,
} from "@/data/items";
import { getRecipesByOutput } from "@/data/recipes";
import RecipeView from "./RecipeView";

export default function RecipePicker({
  isOpen,
  onClose,
  onSave,
  target,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  target?: ItemName;
}) {
  const [activeRecipe, setActiveRecipe] = useState<string | null>(null);

  const recipes = useMemo(() => target ? getRecipesByOutput(target) : [], [target]);

  const recipeViews = useMemo(() => {
    if (!target) {
      return [];
    }

    const source_key = `${target} - source`;
    return [
      <RecipeView
        key={source_key}
        output_name={target}
        image={getItemImageByName(target)}
        onClick={() => setActiveRecipe(source_key)}
        activeRecipe={activeRecipe}
      />,
      ...recipes.map(r => (
        <RecipeView
          key={r.name}
          output_name={target}
          recipe={r.name}
          onClick={() => setActiveRecipe(r.name)}
          activeRecipe={activeRecipe}
        />
      )),
    ];
  }, [recipes, target, activeRecipe]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10 text-white">
      <div className="fixed inset-0 bg-black/35" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
          <DialogPanel
            className="relative flex max-h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-lg bg-slate-800 text-left shadow-xl sm:my-8 sm:max-w-full md:max-w-4xl lg:max-w-6xl"
          >
            <div
              className="flex items-center justify-between gap-3 bg-slate-900 px-4 py-3 sm:px-6"
            >
              <DialogTitle as="h3" className="text-lg/6 font-semibold text-gray-100">
                Add recipe for {target}
              </DialogTitle>
            </div>
            {/* body */}
            <div
              className="flex flex-1 select-none flex-col overflow-hidden"
            >
              <div className="shrink-0 flex flex-col overflow-hidden">
                <h3 className="flex items-center justify-between bg-slate-900 px-3 py-1 font-semibold sm:px-6">
                  <span>Pick a recipe:</span>
                </h3>
                <div className="flex-1 min-h-24 max-h-48 overflow-auto">
                  <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:px-6 md:grid-cols-3 lg:grid-cols-4">
                    {recipeViews}
                  </div>
                </div>
              </div>
            </div>
            {/* footer */}
            <div
              className="flex gap-3 bg-slate-900 px-3 py-3 sm:flex-row-reverse sm:px-6"
            >
              <button className={["flex items-center justify-center rounded-md transition duration-200 ease-in-out text-white bg-sky-500 ring-1 ring-sky-400 px-3 py-1.5 text-sm", activeRecipe ? "hover:bg-sky-400" : "cursor-not-allowed opacity-50"].join(" ")} disabled={activeRecipe === null} onClick={() => { onSave(activeRecipe!); onClose(); }}>Add to planner</button>
              <button className="flex items-center justify-center rounded-md transition duration-200 ease-in-out text-sky-500 ring-1 ring-sky-500 px-3 py-1.5 text-sm hover:text-sky-400 hover:ring-sky-400" onClick={() => onClose()}>Cancel</button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
