import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type Node,
  type Edge,
  type XYPosition,
  ReactFlowProvider,
  type IsValidConnection,
  type OnConnectEnd,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Picker from "./components/picker/Picker";
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
  const [nodes, setNodes, onNodesChange] = useNodesState([] as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [pos, setPos] = useState<XYPosition | null>(null);
  const lastClickAt = useRef<number | null>(null);
  const [isOpen, setOpen] = useState(false);
  const onOpen = useCallback(() => {
    setOpen(true);
    setSource(null);
  }, []);
  const onOpenWithSource = useCallback((source: SourceState) => {
    setOpen(true);
    setSource(source);
  }, []);
  const onClose = useCallback(() => setOpen(false), []);
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
  }, [pos, setNodes, source]);
  const nodeTypes = useMemo(() => ({
    recipe: RecipeNode,
    resource: ResourceNode,
  }), []);
  const edgeTypes = useMemo(() => ({
    conveyor: ConveyorEdge,
  }), []);

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
        console.log("TODO");
      }
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
        isValidConnection={isValidConnection}
        zoomOnDoubleClick={false}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      <Picker
        isOpen={isOpen}
        onClose={onClose}
        onSave={onSave}
        sourceType={source?.sourceItem}
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
