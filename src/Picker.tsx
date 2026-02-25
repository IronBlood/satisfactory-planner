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
import { Items } from "./data/items";
import { ItemCategories } from "./data/categories";

function keysOf<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

export default function Picker({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const categoryKeys = keysOf(ItemCategories);
  type CategoryValue = (typeof ItemCategories)[keyof typeof ItemCategories];

  const [activeCat, setActiveCat] = useState<CategoryValue>(ItemCategories.ALL);

  const onPickCat = useCallback((k: CategoryValue) => {
    setActiveCat(k);
  }, []);

  const filteredItems = useMemo(() => {
    return activeCat === ItemCategories.ALL
      ? Items
      : Items.filter(item => item.category === activeCat);
  }, [activeCat]);

  const cardViews = useMemo(() => {
    return filteredItems.map(item => (
      <Cardview
        key={item.name}
        name={item.name}
        image={item.image}
      />
    ));
  }, [filteredItems]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10 text-white">
      <div className="fixed inset-0 bg-black/75 transition-opacity opacity-100" aria-hidden="true" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
          <DialogPanel
            className="relative flex max-h-[80vh] w-full max-w-md transform flex-col overflow-hidden rounded-lg bg-slate-800 text-left shadow-xl transition-all sm:my-8 sm:max-w-full md:max-w-4xl lg:max-w-6xl opacity-100 translate-y-0 sm:scale-100"
          >
            <div
              className="grid flex-1 grid-cols-4 items-center gap-3 bg-slate-900 px-4 py-3 sm:px-6"
            >
              <DialogTitle as="h3" className="col-span-3 text-lg/6 font-semibold text-gray-100">What's next</DialogTitle>
              <div
                className="TextField flex items-center w-full text-gray-500 border rounded-md hover:border-gray-300 transition-all text-sm h-8 px-3 gap-2 border-gray-500 col-span-1"
              >
                <div className="shrink">
                  <MagnifyingGlassIcon className="size-5" />
                </div>
                <div className="relative flex-1">
                  <input className="_reset-input-number m-0 w-full min-w-4 border-none bg-transparent p-0 text-inherit placeholder:text-gray-400 focus:border-0 focus:text-white focus:outline-none" placeholder="Search" />
                </div>
              </div>
            </div>
            <div
              className="flex flex-1 select-none flex-col overflow-hidden"
            >
              <div className="grid flex-auto grid-cols-3 overflow-hidden bg-slate-800">
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
                    <div id="cat-other" className="relative">
                    </div>
                    <div className="grid grid-cols-2 gap-3 py-3 sm:grid-cols-3 md:grid-cols-4">
                      {cardViews}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex shrink gap-3 bg-slate-900 px-3 py-3 sm:flex-row-reverse sm:px-6"
            >
              <button className="flex h-fit items-center justify-center rounded-md transition duration-200 ease-in-out text-white bg-sky-500 ring-1 ring-sky-400 px-3 py-1.5 text-sm cursor-not-allowed opacity-50" disabled>Add to planner</button>
              <button className="flex h-fit items-center justify-center rounded-md transition duration-200 ease-in-out text-sky-500 ring-1 ring-sky-500 px-3 py-1.5 text-sm hover:text-sky-400 hover:ring-sky-400">Cancel</button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
