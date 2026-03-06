import {
  useCallback,
  useRef,
} from "react";
import {
  ReactFlowProvider,
} from "@xyflow/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import App, {
  type ActionsRef,
} from "./App";
import type {
  MultiFlow,
} from "./types";
import { stripeData, useDataContext } from "./DataProvider";

function MenuButton({
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
  const actionsRef = useRef<ActionsRef>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data, setData } = useDataContext();

  const exportFlow = useCallback(() => {
    const stripedData = stripeData(data);
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
  }, [data]);

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

  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="h-16 border-b border-slate-800 px-4 flex items-center justify-between bg-slate-950 text-white text-xl">
        <div>Yet Another Satisfactory Planner</div>
        <div className="flex gap-2">
          <MenuButton
            onClick={() => exportFlow()}
            text="export"
          />
          <MenuButton
            onClick={() => importFlow()}
            text="import"
          />
          <MenuButton
            onClick={() => actionsRef.current.toggleSidebar?.()}
            text="info"
          />
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
        <App onActionsReady={(a) => { actionsRef.current = a; }} />
      </ReactFlowProvider>
      <footer className="h-12 border-t border-slate-800 bg-slate-950 px-4 flex items-center text-xs text-slate-400">
        <div>
          <span className="font-bold">Disclaimer: </span>Satisfactory and its assets are trademarks and copyrighted materials of <span className="font-bold">Coffee Stain Studios</span>. This is an unofficial fan-made tool and is not affiliated with, endorsed, sponsored, or approved by Coffee Stain Studios. Inspired by <FooterLink href="https://satisfactory-planner.vercel.app/" text="Satisfactory Planner" />. Built with <FooterLink href="https://react.dev/" text="React" />, <FooterLink href="https://reactflow.dev/" text="React Flow" /> and <FooterLink href="https://tailwindcss.com" text="tailwindcss" />.
        </div>
      </footer>
    </div>
  );
}

export default Wrapper;
