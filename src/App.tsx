import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type Edge,
  type IsValidConnection,
  type Node,
  type OnConnectEnd,
  type ReactFlowInstance,
  type XYPosition,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Picker from "./components/picker/Picker";
import RecipePicker from "@/components/picker/RecipePicker";
import RecipeNode, { type RecipeNodeType } from "./nodes/RecipeNode";
import ResourceNode, { type ResourceNodeType } from "@/nodes/ResourceNode";
import {
  getRecipeByName,
} from "./data/recipes";
import { type ItemName } from "@/data/items";
import ConveyorEdge, { type ConveyorEdgeType } from "./nodes/ConveyorEdge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import Summary from "@/components/Summary";
import type { AppNode } from "./types";

function getSrcIdx(s: string) {
  return s.lastIndexOf(` - source`);
}

const isValidConnection: IsValidConnection<Edge> = (connection) => {
  return connection.sourceHandle === connection.targetHandle;
};

type SourceState = {
  sourceNode: string;
  sourceItem: string;
};

type ActionsRef = {
  saveFlow?: () => void;
  loadFlow?: () => void;
  toggleSidebar?: () => void;
};

function App({
  onActionsReady,
}: {
  onActionsReady: (a: ActionsRef) => void;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [source, setSource] = useState<SourceState | null>(null);
  const [target, setTarget] = useState<SourceState | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([] as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as ConveyorEdgeType[]);
  const {
    setViewport,
    screenToFlowPosition,
  } = useReactFlow();
  const [pos, setPos] = useState<XYPosition | null>(null);
  const lastClickAt = useRef<number | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [isRecipePickerOpen, setRecipePickerOpen] = useState(false);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<Node, ConveyorEdgeType> | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const nodeTypes = useMemo(() => ({
    recipe: RecipeNode,
    resource: ResourceNode,
  }), []);

  const edgeTypes = useMemo(() => ({
    conveyor: ConveyorEdge,
  }), []);

  const toggleSidebar = useCallback(() => setSidebarOpen(!isSidebarOpen), [isSidebarOpen, setSidebarOpen]);

  const onOpen = useCallback(() => {
    setOpen(true);
    setSource(null);
  }, []);

  const onOpenWithSource = useCallback((source: SourceState) => {
    setOpen(true);
    setSource(source);
  }, []);

  const onOpenRecipePicker = useCallback((source: SourceState) => {
    setTarget(source);
    setRecipePickerOpen(true);
  }, []);

  const onClose = useCallback(() => setOpen(false), []);
  const onCloseRecipePicker = useCallback(() => setRecipePickerOpen(false), [setRecipePickerOpen]);

  const onConnect = useCallback(
    (params: Connection) => {
      const edge: ConveyorEdgeType = {
        ...params,
        id: crypto.randomUUID(),
        type: "conveyor",
        data: {
          value: 0,
        },
      };
      return setEdges((edgesSnapshot) => addEdge(edge as never, edgesSnapshot))
    },
    [],
  );

  const onConnectEnd: OnConnectEnd = useCallback((event, state) => {
    if (state.toNode === null) {
      const { clientX, clientY } = "changedTouches" in event ? event.changedTouches[0] : event;
      setPos(screenToFlowPosition({ x: clientX, y: clientY }));
      if (state.fromHandle?.type === "source") {
        onOpenWithSource({
          sourceNode: state.fromNode!.id,
          sourceItem: (state.fromHandle!.id as ItemName),
        });
      } else if (state.fromHandle?.type === "target") {
        onOpenRecipePicker({
          sourceNode: state.fromNode!.id,
          sourceItem: (state.fromHandle!.id as ItemName),
        });
      }
    }
  }, [screenToFlowPosition, onOpenWithSource, onOpenRecipePicker]);

  const onEdgeClick = useCallback((_event: MouseEvent<Element, globalThis.MouseEvent>, edge: Edge) => {
    setEdges((edges) => {
      const nextSelected = !(edge?.animated === true);
      return edges.map(e => e.id === edge.id
        ? { ...e, animated: nextSelected }
        : { ...e, animated: false }
      );
    });
  }, [setEdges]);

  const onSave = useCallback((name: string) => {
    if (!pos) {
      throw new Error(`invalid position`);
    }

    const id = crypto.randomUUID();
    const position = {
      x: pos.x,
      y: pos.y,
    };
    let idx = -1;
    let node: ResourceNodeType | RecipeNodeType = ((idx = getSrcIdx(name)) > 0)
      ? {
        id,
        position,
        type: "resource",
        data: {
          count: 0,
          name: name.substring(0, idx),
          isLocked: false,
        },
      } : {
        id,
        position,
        data: {
          recipe: getRecipeByName(name),
          count: 1,
          isLocked: false,
        },
        type: "recipe",
      };

    setNodes((nodes) => [
      ...nodes,
      node,
    ]);

    if (source) {
      onConnect({
        source: source.sourceNode,
        sourceHandle: source.sourceItem,
        target: node.id,
        targetHandle: source.sourceItem,
      });
      setSource(null);
    }
  }, [pos, setNodes, source, onConnect]);

  const onSaveRecipePicker = useCallback((name: string) => {
    if (!pos) {
      throw new Error(`invalid position`);
    }
    if (!target) {
      throw new Error(`invalid target`);
    }

    const id = crypto.randomUUID();
    const position = {
      x: pos.x,
      y: pos.y,
    };
    let idx = -1;

    let node: ResourceNodeType | RecipeNodeType = ((idx = getSrcIdx(name)) > 0)
      ? {
        id,
        position,
        type: "resource",
        data: {
          count: 0,
          name: name.substring(0, idx),
          isLocked: false,
        },
      } : {
        id,
        position,
        data: {
          recipe: getRecipeByName(name),
          count: 1,
          isLocked: false,
        },
        type: "recipe",
      };

    setNodes((nodes) => [
      ...nodes,
      node,
    ]);

    onConnect({
      target: target.sourceNode,
      targetHandle: target.sourceItem,
      source: node.id,
      sourceHandle: target.sourceItem,
    });

    setTarget(null);
  }, [pos, setNodes, target, onConnect]);

  const onDoubleClick = useCallback(
    (event: MouseEvent) => {
      const now = Date.now();
      if (lastClickAt.current !== null && now - lastClickAt.current < 250) {
        setPos(screenToFlowPosition({ x: event.clientX, y: event.clientY }));
        onOpen();
        lastClickAt.current = null;
        return;
      }
      lastClickAt.current = now;
    },
    [screenToFlowPosition, onOpen],
  );

  const onSaveFlow = useCallback(() => {
    if (!rfInstance)
      return;

    const flow = rfInstance.toObject();
    for (const e of flow.edges) {
      delete e.animated;
      delete e.selected;
    }

    const json = JSON.stringify(flow, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `satisfactory-planner-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [rfInstance]);

  const onLoadFlow = useCallback(() => {
    fileInputRef.current?.click();
  }, [setRfInstance]);

  const onPickFlowFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file)
      return;

    try {
      const text = await file.text();
      const json = JSON.parse(text) as {
        nodes: Node[];
        edges: ConveyorEdgeType[];
        viewport: {
          x: number;
          y: number;
          zoom: number;
        };
      };

      if (json) {
        const {
          x = 0,
          y = 0,
          zoom = 1,
        } = json.viewport;

        setNodes(json.nodes || []);
        setEdges(json.edges || []);
        setViewport({ x, y, zoom });
      }
    } catch (err) {
      console.error("Failed to load flow json", err);
    } finally {
      e.target.value = "";
    }
  }, []);

  useEffect(() => {
    onActionsReady({
      saveFlow: onSaveFlow,
      loadFlow: onLoadFlow,
      toggleSidebar,
    });
  }, [onActionsReady, onSaveFlow, onLoadFlow, toggleSidebar]);

  return (
    <main className="bg-slate-950 text-white flex h-full min-h-0">
      <section className="relative flex-1 min-w-0 min-h-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeClick={onEdgeClick}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          onPaneClick={onDoubleClick}
          onInit={setRfInstance}
          isValidConnection={isValidConnection}
          zoomOnDoubleClick={false}
          proOptions={{ hideAttribution: true }}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </section>
      <aside
        className={[
          "shrink-0 border-l border-slate-800 transition-[width] duration-200 overflow-hidden",
          isSidebarOpen ? "w-80" : "w-0 border-l-0",
        ].join(" ")}
      >
        <Summary nodes={nodes as AppNode[]} />
      </aside>
      <Picker
        isOpen={isOpen}
        onClose={onClose}
        onSave={onSave}
        sourceType={source?.sourceItem}
      />
      <RecipePicker
        isOpen={isRecipePickerOpen}
        onClose={onCloseRecipePicker}
        onSave={onSaveRecipePicker}
        target={target?.sourceItem}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={onPickFlowFile}
      />
    </main>
  )
}

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

  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="h-16 border-b border-slate-800 px-4 flex items-center justify-between bg-slate-950 text-white text-xl">
        <div>Yet Another Satisfactory Planner</div>
        <div className="flex gap-2">
          <MenuButton
            onClick={() => actionsRef.current.saveFlow?.()}
            text="save"
          />
          <MenuButton
            onClick={() => actionsRef.current.loadFlow?.()}
            text="load"
          />
          <MenuButton
            onClick={() => actionsRef.current.toggleSidebar?.()}
            text="info"
          />
          <div className="transition duration-200 text-slate-300 hover:text-slate-100 items-center text-2xl"><FontAwesomeIcon icon={faGithub} /></div>
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
