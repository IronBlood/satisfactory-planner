import {
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Cardview from "./Cardview";
import RecipeView from "./RecipeView";
import {
  Items,
  getItemImageByName,
  type Item,
} from "./data/items";
import { ItemCategories } from "./data/categories";
import { getRecipesByOutput } from "./data/recipes";

function keysOf<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

export default function Picker({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}) {
  const categoryKeys = keysOf(ItemCategories);
  type CategoryValue = (typeof ItemCategories)[keyof typeof ItemCategories];

  const [activeCat, setActiveCat] = useState<CategoryValue>(ItemCategories.ALL);
  const [activeRecipe, setActiveRecipe] = useState<string | null>(null);

  const onPickCat = useCallback((k: CategoryValue) => {
    setActiveCat(k);
  }, []);

  const filteredItems = useMemo(() => {
    return activeCat === ItemCategories.ALL
      ? Items
      : Items.filter(item => item.category === activeCat);
  }, [activeCat]);

  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const selectItem = useCallback((item: Item | null) => {
    setActiveItem(item);
  }, []);

  const clearSelection = useCallback(() => {
    setActiveItem(null);
    setActiveRecipe(null);
  }, [setActiveItem, setActiveRecipe]);

  const cardViews = useMemo(() => {
    return filteredItems.map(item => (
      <Cardview
        key={item.name}
        name={item.name}
        image={getItemImageByName(item.name)}
        onClick={() => selectItem(item)}
      />
    ));
  }, [filteredItems]);

  const recipeViews = useMemo(() => {
    const source_key = activeItem === null ? "" : `${activeItem.name} - source`;
    return activeItem === null
      ? []
      : [
        <RecipeView
          key={source_key}
          output_name={activeItem.name}
          image={getItemImageByName(activeItem.name)}
          onClick={() => setActiveRecipe(source_key)}
        />,
        ...getRecipesByOutput(activeItem.name).map(r => (
          <RecipeView
            key={r.name}
            output_name={activeItem.name}
            recipe={r}
            onClick={() => setActiveRecipe(r.name)}
          />
        )),
      ];
  }, [activeItem]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10 text-white">
      <div className="fixed inset-0 bg-black/35" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
          <DialogPanel
            className="relative flex max-h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-lg bg-slate-800 text-left shadow-xl sm:my-8 sm:max-w-full md:max-w-4xl lg:max-w-6xl"
          >
            {/* header */}
            <div
              className="flex items-center justify-between gap-3 bg-slate-900 px-4 py-3 sm:px-6"
            >
              <DialogTitle as="h3" className="text-lg/6 font-semibold text-gray-100">
                What's next
              </DialogTitle>
              <div
                className="TextField flex items-center w-full max-w-xs text-gray-500 border rounded-md hover:border-gray-300 transition-colors text-sm h-8 px-3 gap-2 border-gray-500"
              >
                <MagnifyingGlassIcon className="size-5" />
                <input className="_reset-input-number m-0 w-full min-w-0 border-none bg-transparent p-0 text-inherit placeholder:text-gray-400 focus:text-white focus:outline-none" placeholder="Search" />
              </div>
            </div>

            {/* body */}
            <div
              className="flex flex-1 select-none flex-col overflow-hidden"
            >
              <div className="grid flex-1 min-h-0 grid-cols-3 overflow-hidden bg-slate-800">
                <div className="col-span-1 hidden h-full overflow-hidden p-3 sm:block sm:pl-6">
                  <div className="col-span-1 h-full overflow-auto py-2">
                    {categoryKeys.map((k) => (
                      <div
                        key={k}
                        onClick={() => onPickCat(ItemCategories[k])}
                        className={[
                          "block py-1 pl-4 transition duration-200 ease-in-out",
                          ItemCategories[k] === activeCat
                            ? "border-l border-accent text-sky-500"
                            : "border-l border-transparent text-gray-300 hover:text-sky-500 cursor-pointer",
                        ].join(" ")}
                      >{ItemCategories[k]}</div>
                    ))}
                  </div>
                </div>
                <div className="col-span-3 flex flex-col overflow-hidden p-3 px-0 sm:col-span-2 sm:pr-3">
                  <div className="overflow-auto px-3">
                    <div className="grid grid-cols-2 gap-3 py-3 sm:grid-cols-3 md:grid-cols-4">
                      {cardViews}
                    </div>
                  </div>
                </div>
              </div>
              {/* recipes */}
              {activeItem && <div className="shrink-0 flex flex-col overflow-hidden">
                <h3 className="flex items-center justify-between bg-slate-900 px-3 py-1 font-semibold sm:px-6">
                  <span>Pick a recipe:</span>
                  <button className="flex h-fit items-center justify-center rounded-md transition duration-200 ease-in-out text-sky-500 px-3 py-1.5 text-sm hover:text-sky-400 cursor-pointer" onClick={() => clearSelection()}>Clear</button>
                </h3>
                <div className="flex-1 min-h-24 max-h-48 overflow-auto">
                  <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:px-6 md:grid-cols-3 lg:grid-cols-4">
                    {recipeViews}
                  </div>
                </div>
              </div>}
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
