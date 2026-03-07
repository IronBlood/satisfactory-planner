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
import Picker from "./components/picker/Picker";
import RecipePicker from "@/components/picker/RecipePicker";
import {
  BuildingNode,
  RecipeNode,
  ResourceNode,
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
} from "@/flow/constants";
import {
  getRecipeByName,
} from "./data/recipes";
import { isItemSinkable, type ItemName } from "@/data/items";
import Summary from "@/components/Summary";
import type { AppEdge, AppFlow, AppNode } from "./types";

function getSrcIdx(s: string) {
  return s.lastIndexOf(` - source`);
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
};

function App({
  onActionsReady,
  activeFlow,
}: {
  onActionsReady: (a: ActionsRef) => void;
  activeFlow: AppFlow;
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

  const nodeTypes = useMemo(() => ({
    recipe: RecipeNode,
    resource: ResourceNode,
    building: BuildingNode,
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

    const id = crypto.randomUUID() as string;
    const position = {
      x: pos.x,
      y: pos.y,
    };
    let idx = -1;
    let node: AppNode = isBuilding
      ? {
        id,
        position,
        type: "building",
        data: {
          name: name as SupportedBuildings,
          count: 1,
          isLocked: false,
        },
      } : ((idx = getSrcIdx(name)) > 0)
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
      setEdges(edges => edges.map(e => {
        delete e.animated;
        return e;
      }));
    },
    [screenToFlowPosition, onOpen],
  );

  useEffect(() => {
    setNodes(activeFlow.nodes || []);
    setEdges(activeFlow.edges || []);
    const { x = 0, y = 0, zoom = 1 } = activeFlow.viewport ?? {};
    setViewport({ x, y, zoom });
  }, [activeFlow, setEdges, setNodes, setViewport]);

  useEffect(() => {
    onActionsReady({
      toggleSidebar,
      syncActiveFlow,
    });
  }, [onActionsReady, toggleSidebar, syncActiveFlow]);

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
        <Summary nodes={nodes as AppNode[]} edges={edges} />
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
    </main>
  )
}

export default App;
