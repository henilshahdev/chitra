import React from "react";

import TopNav from "./components/shared/TopNav.tsx";
import LeftNav from "./components/shared/LeftNav.tsx";
import { MarkerType, ReactFlowProvider } from "reactflow";
import { Toaster } from "./components/ui/sonner.tsx";
import Chitra from "./Chitra.tsx";

import { addEdge, Connection, useEdgesState, useNodesState } from "reactflow";

import { initialEdges, initialNodes, onBoardingSteps } from "./constants";
import { useCallback, useState } from "react";

import EntityNode from "./components/CustomRF/EntityNode";
import { EntityDataType } from "./types/index.ts";
import ChitraControls from "./components/shared/ChitraControls.tsx";
import { toast } from "sonner";

import { TourProvider } from "@reactour/tour";
import { Badge, Close, ContentComponent } from "./components/OnBoarding/index.tsx";

const nodeTypes = {
	entity: EntityNode,
};

const App = () => {
	const [selectedEntity, setSelectedEntity] = useState<EntityDataType>({
		data: initialNodes[0].data,
		id: initialNodes[0].id,
	});

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

	const addNewEntity = () => {
		const newNode = {
			id: "",
			position: { x: 0, y: 0 },
			data: {
				entityName: "",
				attributes: [{ name: "id", type: "int", constraint: "PK" }],
			},
			type: "entity",
		};

		setNodes((nds) => {
			newNode.id = `${nds.length + 1}`;
			newNode.data.entityName = `Entity ${nds.length + 1}`;

			return nds.concat(newNode);
		});

		toast("New Entity has been created", {
			description: "Start defining the attributes",
		});
	};

	const addNewAttribute = () => {
		setNodes((nds) =>
			nds.map((node) => {
				if (node.id === selectedEntity?.id) {
					node.data = {
						...node.data,
						attributes: [...node.data.attributes, { name: "attr", type: "int", constraint: "-" }],
					};
				}
				return node;
			})
		);
	};

	return (
		<TourProvider
			styles={{
				popover: (base) => ({
					...base,
					margin: "16px",
					backgroundColor: "hsl(var(--secondary))",
					borderRadius: 10,
					padding: "0px",
				}),
				controls: (base) => ({ ...base, marginTop: 100 }),
				maskArea: (base) => ({ ...base, rx: 10 }),
			}}
			ContentComponent={ContentComponent}
			components={{ Badge, Close }}
			showPrevNextButtons={true}
			showCloseButton={true}
			showDots={true}
			steps={onBoardingSteps}
			disableDotsNavigation
		>
			<ReactFlowProvider>
				<div className="grid h-screen w-full">
					<div className="flex flex-col">
						<TopNav selectedEntity={selectedEntity} setSelectedEntity={setSelectedEntity} />
						<main className="flex-1 flex justify-between items-start lg:space-x-4 overflow-auto p-4">
							<div className="hidden lg:grid lg:gap-6 min-w-[420px] max-w-[420px]">
								<ChitraControls addNewEntity={addNewEntity} addNewAttribute={addNewAttribute} />
								<LeftNav selectedEntity={selectedEntity} setSelectedEntity={setSelectedEntity} />
							</div>
							<div className="flex flex-col w-full h-[100%]">
								<div className="md:hidden">
									<ChitraControls addNewEntity={addNewEntity} addNewAttribute={addNewAttribute} />
								</div>
								<div className="flex flex-grow second-step">
									<Chitra
										nodes={nodes}
										edges={edges}
										onNodesChange={onNodesChange}
										onEdgesChange={onEdgesChange}
										onConnect={onConnect}
										nodeTypes={nodeTypes}
									/>
								</div>
							</div>
						</main>
					</div>
				</div>
				<Toaster />
			</ReactFlowProvider>
		</TourProvider>
	);
};

export default App;
