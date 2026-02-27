import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  useReactFlow,
  type NodeChange,
  type EdgeChange,
  type Connection,
  type Node,
  type Edge,
  type XYPosition,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Picker from "./Picker";
import RecipeNode, { type RecipeNodeType } from "./nodes/RecipeNode";
import {
  getRecipeByName,
} from "./data/recipes";

function isSource(s: string) {
  return s.endsWith(` - source`);
}

function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { screenToFlowPosition } = useReactFlow();
  const [pos, setPos] = useState<XYPosition | null>(null);
  const lastClickAt = useRef<number | null>(null);
  const [isOpen, setOpen] = useState(false);
  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  const onSave = useCallback((name: string) => {
    if (!pos) {
      throw new Error(`invalid position`);
    }

    if (isSource(name)) {
      throw new Error("unimplemented");
    } else {
      setNodes((nodes) => [
        ...nodes,
        ({
          id: crypto.randomUUID(),
          position: {
            x: pos.x,
            y: pos.y,
          },
          data: {
            recipe: getRecipeByName(name),
            count: 1,
          },
          type: "recipe",
        } as RecipeNodeType),
      ]);
    }
  }, [pos, setNodes]);
  const nodeTypes = useMemo(() => ({
    recipe: RecipeNode,
  }), []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
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

  return (
    <div style={{ width: '100vw', height: '100vh' }} className="bg-slate-950 text-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={onDoubleClick}
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
