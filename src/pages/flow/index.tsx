import React from "react";
import { addEdge, Background, BackgroundVariant, Connection, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { OscillatorNode } from "./nodes/OscillatorNode";
import { VolumeNode } from "./nodes/VolumeNode";
import { OutputNode } from "./nodes/OutputNode";

interface FlowProps {

}

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { frequency: 300, type: 'square' }, type: 'osc' },
    { id: '2', position: { x: 0, y: 300 }, data: { gain: 0.6 }, type: 'volume' },
    { id: '3', position: { x: 0, y: 500 }, data: {}, type: 'out' },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
];

const nodeTypes = {
    'osc': OscillatorNode,
    'volume': VolumeNode,
    'out': OutputNode
}


const Flow: React.FC<FlowProps> = (props) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = (params: Connection) => {
        setEdges((eds) => addEdge(params, eds))
    }
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Lines} />
            </ReactFlow>
        </div>
    )
}

export default Flow