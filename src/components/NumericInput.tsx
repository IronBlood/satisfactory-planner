import {
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

import {
  formatNumber,
} from "@/utils";
import clsx from "clsx/lite";

const TabNumber = "Number";
const TabFraction = "Fraction";

const setInput = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
  const s = e.target.value;
  if (s === "" || /^(\d+(\.\d*)?|\.\d*)$/.test(s)) {
    setter(s);
  }
};

export default function NumericInput({
  value,
  readonly = false,
  onCommit,
  textRight = false,
}: {
  value: number;
  readonly?: boolean;
  onCommit: (next: number) => void;
  textRight?: boolean;
}) {
  const [sNumber, setNumber] = useState(formatNumber(value));
  const [sRational, setRational] = useState(formatNumber(value));
  const [sFraction, setFraction] = useState("1");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const formatted = formatNumber(value);
    setNumber(formatted);
    setRational(formatted);
    setFraction("1");
  }, [value]);

  const commit = useCallback(({
    onSuccess,
  }: {
    onSuccess?: () => void;
  } = {}) => {
    let n: number;
    if (selectedIndex === 0) {
      const trimmed = sNumber.trim();
      if (trimmed === "") {
        return;
      }

      n = Number(trimmed);
    } else {
      const tRational = sRational.trim();
      const tFraction = sFraction.trim();
      if (tRational === "" || tFraction === "") {
        return;
      }
      const nRational = Number(tRational);
      const nFraction = Number(tFraction);
      if (nFraction === 0) {
        return;
      }

      n = nRational / nFraction;
    }

    if (!Number.isFinite(n)) {
      return;
    }

    onCommit(Math.max(0, n));
    if (typeof onSuccess === "function") {
      onSuccess();
    }
  }, [sNumber, sRational, sFraction, selectedIndex, onCommit]);

  return (
    <Popover className="inline-block">
      <PopoverButton
        className={clsx(
          "cursor-pointer",
          textRight && "text-right",
        )}
      >
        {formatNumber(value)}
      </PopoverButton>
      <PopoverPanel
        anchor="top"
        className="bg-slate-800 border-slate-500 border rounded-xl p-2 text-white w-44"
      >
        {({ close }) => (
          <>
            <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
              <TabList className="flex gap-2 justify-center">
                {[TabNumber, TabFraction].map((tabName) => (
                  <Tab
                    key={tabName}
                    className="rounded-full px-3 py-1 text-sm/6 font-semibold focus:not-data-focus:outline-none data-focus:outline data-focus:outline-slate-500 data-hover:bg-slate-600 data-selected:bg-slate-700 data-selected:data-hover:bg-slate-700"
                  >
                    {tabName}
                  </Tab>
                ))}
              </TabList>
              <TabPanels className="mt-2">
                <TabPanel>
                  <input
                    className="w-full bg-slate-700 rounded-sm px-1 outline-none focus:ring-1 focus:ring-slate-500"
                    type="text"
                    inputMode="decimal"
                    readOnly={readonly}
                    value={sNumber}
                    onChange={(e) => setInput(e, setNumber)}
                    placeholder="enter the number"
                  />
                </TabPanel>
                <TabPanel className="flex gap-2">
                  <input
                    className="rounded-sm px-1 bg-slate-700 min-w-0 w-full outline-none focus:ring-1 focus:ring-slate-500"
                    type="text"
                    inputMode="decimal"
                    readOnly={readonly}
                    value={sRational}
                    onChange={(e) => setInput(e, setRational)}
                    placeholder="rational"
                  />
                  <span>/</span>
                  <input
                    className="rounded-sm px-1 bg-slate-700 min-w-0 w-full outline-none focus:ring-1 focus:ring-slate-500"
                    type="text"
                    inputMode="decimal"
                    readOnly={readonly}
                    value={sFraction}
                    onChange={(e) => setInput(e, setFraction)}
                    placeholder="fraction"
                  />
                </TabPanel>
              </TabPanels>
            </TabGroup>
            <div className="flex justify-end mt-2">
              <button
                className="size-5 text-red-500 hover:bg-slate-700"
                onClick={() => close()}
              >
                <XMarkIcon />
              </button>
              <button
                className="size-5 text-green-300 hover:bg-slate-700"
                onClick={() => commit({
                  onSuccess: () => close(),
                })}
              >
                <CheckIcon />
              </button>
            </div>
          </>
        )}
      </PopoverPanel>
    </Popover>
  );
}
