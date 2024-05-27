import TopNav from "./components/shared/TopNav.tsx";
import LeftNav from "./components/shared/LeftNav.tsx";
import { MarkerType, ReactFlowProvider } from "reactflow";
import { Toaster } from "./components/ui/sonner.tsx";
import Chitra from "./Chitra.tsx";

import { addEdge, Connection, useEdgesState, useNodesState } from "reactflow";

import { initialEdges, initialNodes } from "./constants";
import { useCallback, useState } from "react";

import EntityNode from "./components/CustomRF/EntityNode";
import { EntityDataType } from "./types/index.ts";

const nodeTypes = {
	entity: EntityNode,
};

const App = () => {
	const [selectedEntity, setSelectedEntity] = useState<EntityDataType>();

	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect = useCallback(
		(connection: Connection) => {
			const edge = {
				...connection,
				animated: true,
				id: `${connection.source} - ${connection.target}`,

				markerEnd: {
					type: MarkerType.ArrowClosed,
					width: 24,
					height: 24,
					color: "#16a34a",
				},
				style: {
					strokeWidth: 1,
					stroke: "#16a34a",
				},
			};
			setEdges((prevEdges) => addEdge(edge, prevEdges));
		},
		[setEdges]
	);

	return (
		<ReactFlowProvider>
			<div className="grid h-screen w-full">
				<div className="flex flex-col">
					<TopNav selectedEntity={selectedEntity} />
					<main className="flex-1 flex justify-between items-start space-x-4 overflow-auto p-4">
						<div className="min-w-[450px] max-w-[450px]">
							<LeftNav selectedEntity={selectedEntity} setSelectedEntity={setSelectedEntity} />
						</div>
						<div className="w-full h-[98%]">
							<Chitra
								nodes={nodes}
								edges={edges}
								onNodesChange={onNodesChange}
								onEdgesChange={onEdgesChange}
								onConnect={onConnect}
								nodeTypes={nodeTypes}
							/>
						</div>
					</main>
				</div>
			</div>
			<Toaster />
		</ReactFlowProvider>
	);
};

export default App;
