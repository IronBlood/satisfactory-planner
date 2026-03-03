import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import {
  Background,
  Controls,
  Panel,
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

function App() {
  const [source, setSource] = useState<SourceState | null>(null);
  const [target, setTarget] = useState<SourceState | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([] as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const {
    setViewport,
    screenToFlowPosition,
  } = useReactFlow();
  const [pos, setPos] = useState<XYPosition | null>(null);
  const lastClickAt = useRef<number | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [isRecipePickerOpen, setRecipePickerOpen] = useState(false);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<Node, never> | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const nodeTypes = useMemo(() => ({
    recipe: RecipeNode,
    resource: ResourceNode,
  }), []);

  const edgeTypes = useMemo(() => ({
    conveyor: ConveyorEdge,
  }), []);

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
        edges: never[]; // FIXME
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

  return (
    <div style={{ width: '100vw', height: '100vh' }} className="bg-slate-950 text-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        onPaneClick={onDoubleClick}
        onInit={setRfInstance}
        isValidConnection={isValidConnection}
        zoomOnDoubleClick={false}
        fitView
      >
        <Background />
        <Controls />
        <Panel position="top-right">
          <div className="flex gap-2">
            <button className="rounded-md px-3 py-1.5 text-lg text-sky-600 border-sky-700 border-2 transition duration-200 ease-in-out hover:text-sky-400 hover:border-sky-400" onClick={onSaveFlow}>save</button>
            <button className="rounded-md px-3 py-1.5 text-lg text-sky-600 border-sky-700 border-2 transition duration-200 ease-in-out hover:text-sky-400 hover:border-sky-400" onClick={onLoadFlow}>load</button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={onPickFlowFile}
            />
          </div>
        </Panel>
      </ReactFlow>
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
    </div>
  )
}

function Wrapper() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}

export default Wrapper;
