import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import {
  Background,
  ConnectionLineType,
  Controls,
  ReactFlow,
  Panel,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type Edge,
  type IsValidConnection,
  type Node,
  type NodeMouseHandler,
  type OnConnectEnd,
  type ReactFlowInstance,
  type XYPosition,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import {
  BuildingNode,
  PassthroughNode,
  RecipeNode,
  ResourceNode,
  type BuildingNodeType,
  type PassthroughNodeType,
  type RecipeNodeType,
  type ResourceNodeType,
  type SupportedBuildings,
} from "@/flow/nodes";
import {
  ConveyorEdge,
  PressureEdge
} from "@/flow/edges";
import {
  AppHandleTypes,
  AppNodeTypes,
} from "@/flow/constants";
import { isItemSinkable, type ItemName } from "@/data/items";
import type { AppEdge, AppFlow, AppNode, PartsCostMultiplier, PowerConsumptionMultiplier } from "./types";
import { PartsCostMultipliers, PowerConsumptionMultipliers } from "./DataProvider";
import {
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { useActiveFlowDataContext } from "./ActiveFlowContextProvider";

const Summary = lazy(() => import("@/components/Summary"));
const Picker = lazy(() => import("./components/picker/Picker"));
const RecipePicker = lazy(() => import("@/components/picker/RecipePicker"));

function getSourceIdx(name: string) {
  return name.lastIndexOf(` - source`);
}

function getPassthroughIdx(name: string) {
  return name.lastIndexOf(` - passthrough`);
}

function createNode({
  name,
  position,
  isBuilding = false,
}: {
  name: string;
  position: { x: number; y: number };
  isBuilding?: boolean;
}): AppNode {
  const id = crypto.randomUUID() as string;
  let idx = -1;
  if (isBuilding) {
    return ({
      id,
      position,
      type: "building",
      data: {
        name: name as SupportedBuildings,
        count: 1,
        isLocked: false,
      },
    }) as BuildingNodeType;
  }

  if ((idx = getSourceIdx(name)) > 0) {
    return ({
      id,
      position,
      type: "resource",
      data: {
        count: 0,
        name: name.substring(0, idx),
        isLocked: false,
      },
    }) as ResourceNodeType;
  }

  if ((idx = getPassthroughIdx(name)) > 0) {
    return ({
      id,
      position,
      type: "passthrough",
      data: {
        name: name.substring(0, idx),
        isLocked: false,
      },
    }) as PassthroughNodeType;
  }

  return ({
    id,
    position,
    data: {
      recipe: name,
      count: 1,
      isLocked: false,
    },
    type: "recipe",
  }) as RecipeNodeType;
}

const isValidConnection: IsValidConnection<Edge> = (connection) => {
  if (connection.sourceHandle === AppHandleTypes.Pressure && connection.targetHandle === AppHandleTypes.Pressure) {
    return true;
  }
  if (connection.sourceHandle === AppHandleTypes.Pressure || connection.targetHandle === AppHandleTypes.Pressure) {
    return false;
  }

  if (connection.targetHandle === AppHandleTypes.AwesomeCollector) {
    return true;
  }

  if (connection.targetHandle === AppHandleTypes.AwesomeSink) {
    return connection.sourceHandle
      ? isItemSinkable(connection.sourceHandle)
      : false;
  }
  return connection.sourceHandle === connection.targetHandle;
};

type SourceState = {
  sourceNode: string;
  sourceItem: string;
};

export type ActionsRef = {
  syncActiveFlow?: () => AppFlow | null;
  toggleSidebar?: () => void;
  setActiveFlow?: (flow: AppFlow) => void;
};

function Label({
  text,
  desc,
}: {
  text: string;
  desc: string;
}) {
  return (
    <div className="relative group">
      <span
        className="select-none cursor-help"
      >
        {text}
      </span>
      <div
        className="pointer-events-none absolute top-full z-10 -translate-x-1/2 rounded-sm bg-slate-800 border border-slate-700 px-2 py-1 text-sx text-slate-100 opacity-0 shadow transition group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {desc}
      </div>
    </div>
  );
}

type NumericListInput<T> = {
  value: T;
  numbers: readonly T[];
  setter: (value: T) => void;
};

type MultiplierSetterEntry<T> = NumericListInput<T> & {
  text: string;
  desc: string;
};

function NumericList<T extends number>({
  value,
  numbers,
  setter,
}: NumericListInput<T>) {
  return (
    <Listbox
      value={value}
      onChange={(v) => setter(v)}
    >
      <ListboxButton
        className="relative min-w-16 rounded-lg bg-slate-800 text-slate-300 py-0.5 px-2 data-focus:outline-2 flex items-center justify-between focus:not-data-focus:outline-none data-focus:-outline-offset-2 text-right"
      >
        {value}
        <ChevronDownIcon
          className="group pointer-events-none aboslute size-4 fill-white/60"
          aria-hidden="true"
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        className="w-(--button-width) rounded-lg p-1 border border-slate-700 bg-slate-800 [--anchor-gap:--spacing(1)]"
      >
        {numbers.map((num, idx) => (
          <ListboxOption
            key={`${idx}-${num}`}
            value={num}
            className="group flex cursor-default items-center gap-2 rounded-lg px-1 py-1 select-none data-focus:bg-slate-700"
          >
            <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
            <div className="flex-1 text-right tabular-nums text-sm/6 text-slate-300">{num}</div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

function MultiplierSetter<T extends number>({
  entry,
}: {
  entry: MultiplierSetterEntry<T>;
}) {
  const {
    value,
    numbers,
    setter,
    text,
    desc,
  } = entry;
  return (
    <div
      className="flex flex-row gap-2 items-center"
    >
      <NumericList
        value={value}
        numbers={numbers}
        setter={setter}
      />
      <Label
        text={text}
        desc={desc}
      />
    </div>
  );
}

function App({
  onActionsReady,
}: {
  onActionsReady: (a: ActionsRef) => void;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [source, setSource] = useState<SourceState | null>(null);
  const [target, setTarget] = useState<SourceState | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([] as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as AppEdge[]);
  const {
    setViewport,
    screenToFlowPosition,
  } = useReactFlow();
  const [pos, setPos] = useState<XYPosition | null>(null);
  const lastClickAt = useRef<number | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [isRecipePickerOpen, setRecipePickerOpen] = useState(false);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<Node, AppEdge> | null>(null);
  const {
    powerConsumptionMultiplier,
    partsCostMultiplier,
    setPartsCostMultiplier,
    setPowerConsumptionMultiplier,
  } = useActiveFlowDataContext();

  const powerConsumptionSettingEntry: MultiplierSetterEntry<PowerConsumptionMultiplier> = useMemo(() => ({
    numbers: PowerConsumptionMultipliers,
    value: powerConsumptionMultiplier,
    setter: setPowerConsumptionMultiplier,
    text: "PCM",
    desc: "Power Consumption Multiplier",
  }), [
    powerConsumptionMultiplier,
    PowerConsumptionMultipliers,
    setPowerConsumptionMultiplier,
  ]);

  const partsCostSettingEntry: MultiplierSetterEntry<PartsCostMultiplier> = useMemo(() => ({
    numbers: PartsCostMultipliers,
    value: partsCostMultiplier,
    setter: setPartsCostMultiplier,
    text: "RPCM",
    desc: "Recipe Parts Cost Multiplier"
  }), [
    partsCostMultiplier,
    PartsCostMultipliers,
    setPartsCostMultiplier,
  ]);

  const nodeTypes = useMemo(() => ({
    [AppNodeTypes.Recipe]: RecipeNode,
    [AppNodeTypes.Resource]: ResourceNode,
    [AppNodeTypes.Building]: BuildingNode,
    [AppNodeTypes.Passthrough]: PassthroughNode,
  }), []);

  const edgeTypes = useMemo(() => ({
    conveyor: ConveyorEdge,
    pressure: PressureEdge,
  }), []);

  const toggleSidebar = useCallback(() => setSidebarOpen(!isSidebarOpen), [isSidebarOpen, setSidebarOpen]);
  const syncActiveFlow = useCallback(() => rfInstance?.toObject() as AppFlow | null, [rfInstance]);

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
      const edge: AppEdge = params.sourceHandle === AppHandleTypes.Pressure
        ? {
          ...params,
          id: crypto.randomUUID(),
          type: "pressure",
        }
        : {
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
      if (([
        AppHandleTypes.AwesomeSink,
        AppHandleTypes.Pressure,
        AppHandleTypes.AwesomeCollector,
      ] as string[]).includes(state.fromHandle?.id ?? "")) {
        return;
      }
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

  const onNodeClick: NodeMouseHandler<Node> = useCallback((_, node) => {
    const linked = edges.filter(e => e.target === node.id || e.source === node.id);
    const linkedIdSet = new Set(linked.map(e => e.id));
    setEdges(edges =>
      edges.map(e => linkedIdSet.has(e.id)

        ? { ...e, selected: true }
        : { ...e, selected: false }
      )
    );
  }, [setEdges, edges]);

  const onSave = useCallback((name: string, isBuilding?: boolean) => {
    if (!pos) {
      throw new Error(`invalid position`);
    }

    const position = {
      x: pos.x,
      y: pos.y,
    };
    let node: AppNode = createNode({
      name,
      position,
      isBuilding,
    });

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

    const position = {
      x: pos.x,
      y: pos.y,
    };

    let node = createNode({
      position,
      name,
    });

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
      setEdges(edges => edges.map(e => {
        delete e.animated;
        return e;
      }));
    },
    [screenToFlowPosition, onOpen],
  );

  const setActiveFlow = useCallback((activeFlow: AppFlow) => {
    setNodes(activeFlow.nodes || []);
    setEdges(activeFlow.edges || []);
    const { x = 0, y = 0, zoom = 1 } = activeFlow.viewport ?? {};
    setViewport({ x, y, zoom });
  }, [setEdges, setNodes, setViewport]);

  useEffect(() => {
    onActionsReady({
      toggleSidebar,
      syncActiveFlow,
      setActiveFlow,
    });
  }, [onActionsReady, toggleSidebar, syncActiveFlow, setActiveFlow]);

  return (
    <main className="bg-slate-950 text-white flex h-full min-h-0 planner-flow">
      <section className="relative flex-1 min-w-0 min-h-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onNodeClick={onNodeClick}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          onPaneClick={onDoubleClick}
          onInit={setRfInstance}
          isValidConnection={isValidConnection}
          zoomOnDoubleClick={false}
          nodeOrigin={[0.5, 0.5]}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
        >
          <Panel
            position="top-left"
            className="flex flex-col gap-2"
          >
            <MultiplierSetter
              entry={powerConsumptionSettingEntry}
            />
            <MultiplierSetter
              entry={partsCostSettingEntry}
            />
          </Panel>
          <Background />
          <Controls />
        </ReactFlow>
      </section>
      <aside
        className={[
          "shrink-0 border-l transition-[width,border-color] duration-200 overflow-hidden",
          isSidebarOpen ? "w-80 border-slate-800" : "w-0 border-transparent",
        ].join(" ")}
      >
        <div
          className={[
            "h-full w-80 transition-[transform,opacity] duration-200",
            isSidebarOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-4 opacity-0 pointer-events-none"
          ].join(" ")}
        >
          <Suspense fallback={null}>
            <Summary />
          </Suspense>
        </div>
      </aside>
      <Suspense fallback={null}>
        <Picker
          isOpen={isOpen}
          onClose={onClose}
          onSave={onSave}
          sourceType={source?.sourceItem}
        />
      </Suspense>
      <Suspense fallback={null}>
        <RecipePicker
          isOpen={isRecipePickerOpen}
          onClose={onCloseRecipePicker}
          onSave={onSaveRecipePicker}
          target={target?.sourceItem}
        />
      </Suspense>
    </main>
  )
}

export default App;
