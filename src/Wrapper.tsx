import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import {
  ReactFlowProvider,
} from "@xyflow/react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Popover,
  PopoverButton,
  PopoverPanel,
  Switch,
} from "@headlessui/react";
import type {
  ActionsRef,
} from "./App";
import type {
  MultiFlow,
} from "./types";
import {
  stripData,
  upgradeData,
  useDataContext,
} from "./DataProvider";
import {
  useActiveFlowDataContext,
} from "./ActiveFlowContextProvider";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ChevronDownIcon,
  CheckIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  DocumentIcon,
  InformationCircleIcon,
  MinusIcon,
  PlusIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { loadGoogleAnalytics } from "./analytics";

const GA_KEY = "allow_ga";
const App = lazy(() => import("./App"));

function AppMenuButton({
  text,
  icon: Icon,
  onClick,
}: {
  text: string;
  icon: ComponentType<{ className?: string }>;
  onClick: () => void;
}) {
  return (
    <button className="rounded-md lg:px-3 text-lg text-sky-600 border-sky-700 lg:border-2 transition duration-200 ease-in-out hover:text-sky-400 hover:border-sky-400 cursor-pointer flex items-center" onClick={onClick}>
      <Icon className="w-5 h-5 lg:hidden" />
      <span className="hidden lg:inline">{text}</span>
    </button>
  );
}

function IconButton({
  label,
  onClick,
  disabled = false,
  children,
  className = "",
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative group">
      <button
        type="button"
        aria-label={label}
        title={label}
        disabled={disabled}
        onClick={onClick}
        className={`cursor-pointer disabled:cursor-not-allowed disabled:text-slate-600 flex items-center ${className}`}
      >
        {children}
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-sx text-slate-100 opacity-0 shadow transition group-hover:opacity-100 group-focus-within:opacity-100">
        {label}
      </div>
    </div>
  );
}

function FooterLink({
  text,
  href,
}: {
  text: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      className="font-bold border-b border-dashed"
    >
      {text}
    </a>
  );
}

function hasInvalidFilenameChars(name: string) {
  return /[\\/:*?"<>|\u0000-\u001f]/.test(name);
}

function isInvalidFilename(name: string) {
  const base = name.trim().replace(/\.json$/i, "");
  return base === "" || base === "." || hasInvalidFilenameChars(base);
}

function NameEditor({
  value,
  onChange,
  placeholder,
  accept,
  isDisabled,
  exit,
}: {
  value: string;
  onChange: (s: string) => void;
  placeholder: string;
  accept: () => void;
  isDisabled: boolean;
  exit: () => void;
}) {
  return (
    <div className="flex items-center">
      <input
        className="text-sm text-slate-300 bg-slate-800 border border-slate-500 rounded-md px-3 py-1 focus:outline-none focus:border-slate-100 hover:border-blue-300 placeholder:text-slate-500 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <div className="text-sm flex items-center">
        <IconButton
          label="confirm"
          onClick={accept}
          disabled={isDisabled}
          className="h-6 w-6 text-green-300"
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          label="cancel"
          onClick={exit}
          className="h-6 w-6 text-red-500"
        >
          <XMarkIcon />
        </IconButton>
      </div>
    </div>
  );
}

function Wrapper() {
  const { activeIdx, setActiveIdx: _setActiveIdx } = useActiveFlowDataContext();
  const actionsRef = useRef<ActionsRef>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isRenamingPlan, setRenamingPlan] = useState(false);
  const [isRenamingFile, setRenamingFile] = useState(false);
  const [planNameInput, setPlanNameInput] = useState("");
  const [fileNameInput, setFileNameInput] = useState("");
  const [showGABanner, setShowGABanner] = useState(false);
  const [gaChoice, setGaChoice] = useState<boolean>(false);

  const {
    data,
    importData,
    addFlow,
    deleteFlow: _deleteFlow,
    renameFlow,
    replaceFlow,
    previewReplaceFlow,
    setFilename,
  } = useDataContext();

  useEffect(() => {
    const raw = localStorage.getItem(GA_KEY);
    if (raw === "true") {
      loadGoogleAnalytics();
    } else if (raw === "false") {
      // do nothing
    } else {
      setShowGABanner(true);
    }
    setGaChoice(raw === "true");
  }, []);

  const setTrack = useCallback((value: boolean) => {
    localStorage.setItem(GA_KEY, String(value));
    setShowGABanner(false);
    setGaChoice(value);
    if (value) {
      loadGoogleAnalytics();
    }
  }, []);

  const list = useMemo(() => data.flows.map((flow, idx) => ({
    id: idx,
    name: flow.name,
  })), [data]);

  const exportFlow = useCallback(() => {
    const snapshot = actionsRef.current.syncActiveFlow?.();
    if (!snapshot) {
      throw new Error("cannot get a snapshot");
    }

    const actionData = {
      index: activeIdx,
      flow: snapshot,
    };

    const nextData = previewReplaceFlow(actionData);
    replaceFlow(actionData);

    const stripedData = stripData(nextData);
    const json = JSON.stringify(stripedData, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = data.filename.length === 0
      ? `satisfactory-planner-${new Date().toISOString().replace(/[:.]/g, "-")}.json`
      : data.filename.endsWith(".json")
        ? data.filename
        : `${data.filename}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [data, activeIdx, actionsRef, previewReplaceFlow, replaceFlow]);

  const importFlow = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onPickFlowFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file)
      return;

    try {
      const text = await file.text();
      const json = JSON.parse(text) as MultiFlow;

      if (json) {
        let filename = file.name;
        if (filename.endsWith(".json")) {
          filename = filename.substring(0, filename.length - 5);
        }
        json.filename = filename;

        upgradeData(json);
        // TODO validate
        importData(json);
        _setActiveIdx(0);
        actionsRef.current.setActiveFlow?.(json.flows[0].flow);
      }
    } catch (err) {
      console.error("Failed to load flow json", err);
    } finally {
      e.target.value = "";
    }
  }, [upgradeData, importData, _setActiveIdx, actionsRef]);

  const setActiveIdx = useCallback((idx: number) => {
    const snapshot = actionsRef.current.syncActiveFlow?.();
    if (!snapshot) {
      throw new Error("cannot get a snapshot");
    }

    replaceFlow({
      index: activeIdx,
      flow: snapshot,
    });

    if (idx < 0) {
      idx = 0;
    }

    if (idx >= data.flows.length) {
      idx = data.flows.length - 1;
    }

    _setActiveIdx(idx | 0);
    actionsRef.current.setActiveFlow?.(data.flows[idx].flow);
  }, [activeIdx, _setActiveIdx, data, replaceFlow, actionsRef]);

  const deleteFlow = useCallback(() => {
    if (data.flows.length <= 1) {
      return;
    }

    const nextFlow = data.flows[activeIdx === 0 ? 1 : 0].flow;
    _setActiveIdx(0);
    actionsRef.current.setActiveFlow?.(nextFlow);
    _deleteFlow(activeIdx);
  }, [data, activeIdx, _setActiveIdx, _deleteFlow, actionsRef]);

  const selectedFlowName = useMemo(() => list[activeIdx], [list, activeIdx]);

  const enterRenamingPlan = useCallback(() => {
    setRenamingPlan(true);
    setPlanNameInput(selectedFlowName.name);
  }, [setRenamingPlan, selectedFlowName, setPlanNameInput]);

  const enterRenamingFile = useCallback(() => {
    setRenamingFile(true);
    setFileNameInput(data.filename);
  }, [setRenamingFile, data]);

  const exitRenamingPlan = useCallback(() => {
    setRenamingPlan(false);
    setPlanNameInput("");
  }, [setRenamingPlan, setPlanNameInput]);

  const exitRenamingFile = useCallback(() => {
    setRenamingFile(false);
    setFileNameInput("");
  }, [setRenamingFile, setFileNameInput]);

  const acceptRenamingPlan = useCallback(() => {
    if (planNameInput.length === 0) {
      // TODO
      console.error("shouldn't be empty");
      setRenamingPlan(false);
      return;
    }

    renameFlow({
      name: planNameInput,
      index: activeIdx,
    });

    setRenamingPlan(false);
    setPlanNameInput("");
  }, [activeIdx, planNameInput, setRenamingPlan, setPlanNameInput, renameFlow]);

  const acceptRenamingFile = useCallback(() => {
    if (isInvalidFilename(fileNameInput)) {
      console.error("invalid filename");
      setRenamingFile(false);
      return;
    }

    setFilename(fileNameInput);
    setRenamingFile(false);
    setFileNameInput("");
  }, [fileNameInput, setRenamingFile, setFileNameInput, setFilename]);

  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="h-16 border-b border-slate-800 px-4 flex items-center justify-between bg-slate-950 text-white text-xl">
        <div>Yet Another Satisfactory Planner</div>
        {!isRenamingPlan && !isRenamingFile &&
          <div className="w-56 gap-2 flex justify-between items-center">
            <Listbox value={selectedFlowName} onChange={(v) => setActiveIdx(v.id)}>
              <ListboxButton
                className="relative flex-1 rounded-lg bg-slate-800 text-left text-sm text-slate-300 py-1.5 px-2 data-focus:outline-2 flex items-center justify-between focus:not-data-focus:outline-none data-focus:-outline-offset-2"
              >
                {selectedFlowName.name}
                <ChevronDownIcon
                  className="group pointer-events-none aboslute size-4 fill-white/60"
                  aria-hidden="true"
                />
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                transition
                className="w-(--button-width) rounded-xl border border-slate-700 bg-slate-800 p-1 [--anchor-gap:--spacing(1)] focus:outline-none transition duration-100 ease-in data-leav:data-closed:opacity-0"
              >
                {list.map((item, idx) => (
                  <ListboxOption
                    key={`${idx}-${item.name}`}
                    value={item}
                    className="group flex cursor-default items-center gap-2 rounded-lg px-1 py-1 select-none data-focus:bg-slate-700"
                  >
                    <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                    <div className="text-sm/6 text-slate-300">{item.name}</div>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
            <div
              className="text-slate-300 text-sm flex items-center"
            >
              <IconButton
                label="Add a plan"
                onClick={() => addFlow()}
                className="w-5 h-5"
              >
                <PlusIcon />
              </IconButton>
              <IconButton
                disabled={data.flows.length === 1}
                onClick={deleteFlow}
                label="Delete this plan"
                className="w-5 h-5"
              >
                <MinusIcon />
              </IconButton>
              <IconButton
                onClick={enterRenamingPlan}
                label="Rename this plan"
                className="w-5 h-5"
              >
                <PencilIcon />
              </IconButton>
              <IconButton
                onClick={enterRenamingFile}
                label="Rename file"
                className="w-5 h-5"
              >
                <DocumentIcon />
              </IconButton>
            </div>
          </div>}
        {isRenamingPlan && (
          <NameEditor
            value={planNameInput}
            onChange={(name) => setPlanNameInput(name)}
            placeholder="your next awesome plan"
            accept={acceptRenamingPlan}
            isDisabled={planNameInput.length === 0}
            exit={exitRenamingPlan}
          />
        )}
        {isRenamingFile && (
          <NameEditor
            value={fileNameInput}
            onChange={(name) => setFileNameInput(name)}
            placeholder="filename"
            accept={acceptRenamingFile}
            isDisabled={isInvalidFilename(fileNameInput)}
            exit={exitRenamingFile}
          />
        )}
        <div className="flex gap-2">
          <AppMenuButton
            onClick={() => exportFlow()}
            text="export"
            icon={ArrowDownTrayIcon}
          />
          <AppMenuButton
            onClick={() => importFlow()}
            text="import"
            icon={ArrowUpTrayIcon}
          />
          <AppMenuButton
            onClick={() => actionsRef.current.toggleSidebar?.()}
            text="info"
            icon={InformationCircleIcon}
          />
          <Popover
            className="flex items-center"
          >
            <PopoverButton className="size-5">
              <Cog6ToothIcon
                className="text-sky-700 hover:text-sky-500 cursor-pointer"
              />
            </PopoverButton>
            <PopoverPanel
              anchor="bottom end"
              className="w-72 rounded-xl border border-slate-800 bg-slate-700 p-4 text-sm text-slate-300 flex flex-col mt-4"
            >
              <div>
                <div className="flex justify-between items-center gap-2">
                  <span>Allow analytics</span>
                  <Switch
                    checked={gaChoice}
                    onChange={setTrack}
                    className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-white/10 data-focus:outline data-focus:outline-white"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-slate-700 shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7 group-data-checked:bg-green-400"
                    />
                  </Switch>
                </div>
                <div className="italic">
                  refresh required after changes
                </div>
              </div>
            </PopoverPanel>
          </Popover>
          <div className="transition duration-200 text-sky-600 hover:text-sky-300 flex items-center"><a href="https://github.com/IronBlood/satisfactory-planner" target="_blank"><CodeBracketIcon className="h-5 w-5" /></a></div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={onPickFlowFile}
          />
        </div>
      </header>
      <ReactFlowProvider>
        <Suspense fallback={null}>
          <App
            onActionsReady={(a) => { actionsRef.current = a; }}
          />
        </Suspense>
      </ReactFlowProvider>
      <footer className="h-12 border-t border-slate-800 bg-slate-950 px-4 flex items-center text-xs text-slate-400">
        <div>
          <span className="font-bold">Disclaimer: </span>Satisfactory and its assets are trademarks and copyrighted materials of <span className="font-bold">Coffee Stain Studios</span>. This is an unofficial fan-made tool and is not affiliated with, endorsed, sponsored, or approved by Coffee Stain Studios. Inspired by <FooterLink href="https://satisfactory-planner.vercel.app/" text="Satisfactory Planner" />. Built with <FooterLink href="https://react.dev/" text="React" />, <FooterLink href="https://reactflow.dev/" text="React Flow" /> and <FooterLink href="https://tailwindcss.com" text="tailwindcss" />.
        </div>
      </footer>
      {showGABanner && (
        <div
          className="h-16 bg-slate-800 px-4 text-sm text-slate-400 flex justify-between items-center"
        >
          <span>We’d like to use Google Analytics to understand how this site is used and improve it. We only enable it if you agree. You can turn this off at any time.</span>
          <div
            className="ml-4 text-white flex gap-2"
          >
            <button
              className="bg-green-700 p-2 cursor-pointer inline-flex items-center"
              onClick={() => setTrack(true)}
            >
              <CheckIcon className="h-5 w-5" />
              <span className="hidden xl:inline">Yes</span>
            </button>
            <button
              className="bg-red-600 p-2 cursor-pointer inline-flex items-center"
              onClick={() => setTrack(false)}
            >
              <XMarkIcon className="h-5 w-5" />
              <span className="hidden xl:inline">No, don't track</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wrapper;
