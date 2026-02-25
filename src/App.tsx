import {
  useCallback,
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
  type NodeChange,
  type EdgeChange,
  type Connection,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Picker from "./Picker";

const initialNodes: Node[] = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];
const initialEdges: Edge[] = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const lastClickAt = useRef<number | null>(null);
  const [isOpen, setOpen] = useState(false);
  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);

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
        onOpen();
        lastClickAt.current = null;
        return;
      }
      lastClickAt.current = now;
    },
    [],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }} className="bg-slate-950 text-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
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
      />
    </div>
  )
}

export default App
