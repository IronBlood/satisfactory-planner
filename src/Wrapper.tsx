import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
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
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Switch,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faGear,
  faMinus,
  faPlus,
  faPencil,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import App, {
  type ActionsRef,
} from "./App";
import type {
  MultiFlow,
} from "./types";
import { getDefaultFlow, stripData, useDataContext } from "./DataProvider";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { loadGoogleAnalytics } from "./analytics";

const GA_KEY = "allow_ga";

function AppMenuButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button className="rounded-md px-3 text-lg text-sky-600 border-sky-700 border-2 transition duration-200 ease-in-out hover:text-sky-400 hover:border-sky-400 cursor-pointer" onClick={onClick}>{text}</button>
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
        className={`cursor-pointer disabled:cursor-not-allowed disabled:text-slate-600 ${className}`}
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

function Wrapper() {
  const [activeIdx, _setActiveIdx] = useState(0);
  const actionsRef = useRef<ActionsRef>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isRenaming, setRenaming] = useState(false);
  const [planName, setPlanName] = useState("");
  const [showGABanner, setShowGABanner] = useState(false);
  const [gaChoice, setGaChoice] = useState<boolean>(false);

  const { data, setData } = useDataContext();

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

    const nextData = {
      ...data,
      flows: data.flows.map((flow, idx) => idx !== activeIdx
        ? flow
        : { ...flow, flow: snapshot }
      ),
    };

    setData(nextData);

    const stripedData = stripData(nextData);
    const json = JSON.stringify(stripedData, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `satisfactory-planner-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [data, activeIdx, actionsRef, setData]);

  const importFlow = useCallback(() => {
    fileInputRef.current?.click();
  }, [setData]);

  const onPickFlowFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file)
      return;

    try {
      const text = await file.text();
      const json = JSON.parse(text) as MultiFlow;

      if (json) {
        // TODO validate
        setData(json);
      }
    } catch (err) {
      console.error("Failed to load flow json", err);
    } finally {
      e.target.value = "";
    }
  }, []);

  const setActiveIdx = useCallback((idx: number) => {
    const snapshot = actionsRef.current.syncActiveFlow?.();
    if (!snapshot) {
      throw new Error("cannot get a snapshot");
    }

    const nextData = {
      ...data,
      flows: data.flows.map((flow, idx) => idx !== activeIdx
        ? flow
        : { ...flow, flow: snapshot }
      ),
    };

    setData(nextData);

    if (idx < 0) {
      idx = 0;
    }

    if (idx > data.flows.length) {
      idx = data.flows.length - 1;
    }

    _setActiveIdx(idx | 0);
  }, [activeIdx, _setActiveIdx, data, setData]);

  const addFlow = useCallback(() => {
    setData({
      ...data,
      flows: [
        ...data.flows,
        getDefaultFlow(),
      ],
    });
  }, [data, setData]);

  const deleteFlow = useCallback(() => {
    if (data.flows.length <= 1) {
      return;
    }

    const idx = activeIdx;
    setActiveIdx(0);

    setData({
      ...data,
      flows: [
        ...data.flows.slice(0, idx),
        ...data.flows.slice(idx + 1),
      ],
    });
  }, [data, activeIdx, setData, setActiveIdx]);

  const selectedFlowName = useMemo(() => list[activeIdx], [list, activeIdx]);
  const activeFlow = useMemo(() => data.flows[activeIdx].flow, [data, activeIdx]);

  const enterRenaming = useCallback(() => {
    setRenaming(true);
    setPlanName(selectedFlowName.name);
  }, [setRenaming, selectedFlowName, setPlanName]);

  const exitRenaming = useCallback(() => {
    setRenaming(false);
    setPlanName("");
  }, [setRenaming, setPlanName]);

  const acceptRenaming = useCallback(() => {
    if (planName.length === 0) {
      // TODO
      console.error("shouldn't be empty");
      setRenaming(false);
      return;
    }

    const snapshot = actionsRef.current.syncActiveFlow?.();
    if (!snapshot) {
      throw new Error("cannot get a snapshot");
    }

    setData({
      ...data,
      flows: data.flows.map((flow, idx) => idx === activeIdx
        ? {
          ...flow,
          name: planName,
          flow: snapshot,
        }
        : flow
      ),
    });

    setRenaming(false);
    setPlanName("");
  }, [data, activeIdx, planName, setRenaming, setPlanName, setData]);

  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="h-16 border-b border-slate-800 px-4 flex items-center justify-between bg-slate-950 text-white text-xl">
        <div>Yet Another Satisfactory Planner</div>
        {!isRenaming &&
          <div className="w-46 gap-2 flex justify-between items-center">
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
                onClick={addFlow}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                />
              </IconButton>
              <IconButton
                disabled={data.flows.length === 1}
                onClick={deleteFlow}
                label="Delete this plan"
              >
                <FontAwesomeIcon
                  icon={faMinus}
                />
              </IconButton>
              <IconButton
                onClick={enterRenaming}
                label="Rename this plan"
              >
                <FontAwesomeIcon
                  icon={faPencil}
                />
              </IconButton>
            </div>
          </div>}
        {isRenaming && <div className="flex items-center">
          <input
            className="text-sm text-slate-300 bg-slate-800 border border-slate-500 rounded-md px-3 py-1 focus:outline-none focus:border-slate-100 hover:border-blue-300 placeholder:text-slate-500 outline-none"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="your next awesome plan"
          />
          <div className="text-sm flex items-center">
            <IconButton
              label="confirm"
              onClick={acceptRenaming}
              disabled={planName.length === 0}
              className="text-green-300"
            >
              <FontAwesomeIcon
                icon={faCheck}
              />
            </IconButton>
            <IconButton
              label="cancel"
              onClick={exitRenaming}
            >
              <FontAwesomeIcon
                className="text-red-500"
                icon={faXmark}
              />
            </IconButton>
          </div>
        </div>}
        <div className="flex gap-2">
          <AppMenuButton
            onClick={() => exportFlow()}
            text="export"
          />
          <AppMenuButton
            onClick={() => importFlow()}
            text="import"
          />
          <AppMenuButton
            onClick={() => actionsRef.current.toggleSidebar?.()}
            text="info"
          />
          {!showGABanner && (
            <Menu>
              <MenuButton>
                <FontAwesomeIcon
                  className="text-sky-700 hover:text-sky-500 cursor-pointer"
                  icon={faGear}
                />
              </MenuButton>
              <MenuItems
                transition
                anchor="bottom end"
                className="origin-top-right rounded-xl border border-slate-800 bg-slate-700 p-4 text-sm text-slate-300 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
              >
                <MenuItem>
                  <div>
                    <div className="flex justify-between text-sm items-center gap-2">
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
                </MenuItem>
              </MenuItems>
            </Menu>
          )}
          <div className="transition duration-200 text-sky-700 hover:text-sky-500 items-center text-2xl"><FontAwesomeIcon icon={faGithub} /></div>
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
        <App
          onActionsReady={(a) => { actionsRef.current = a; }}
          activeFlow={activeFlow}
        />
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
            className="text-white flex gap-2"
          >
            <button
              className="bg-green-700 p-2 cursor-pointer"
              onClick={() => setTrack(true)}
            >
              <FontAwesomeIcon
                icon={faCheck}
              />
              Yes
            </button>
            <button
              className="bg-red-600 p-2 cursor-pointer"
              onClick={() => setTrack(false)}
            >
              <FontAwesomeIcon
                icon={faXmark}
              />
              No, don't track
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wrapper;
