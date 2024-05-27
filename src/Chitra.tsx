import ReactFlow, { Background, ControlButton, Controls, useReactFlow } from "reactflow";

import "reactflow/dist/style.css";

import { ChitraProps } from "./types";

import { MaximizeIcon, MinusIcon, PlusIcon } from "lucide-react";
import { proOptions } from "./constants";

export type FitViewOptions = {
	padding: number;
	duration?: number;
};

const fitViewOptions: FitViewOptions = {
	padding: 0,
	duration: 500,
};

const Chitra = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect, nodeTypes }: ChitraProps) => {
	const { zoomIn, zoomOut, fitView } = useReactFlow();

	return (
		<div className="w-full h-full border rounded-lg mt-2">
			<ReactFlow
				proOptions={proOptions}
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				fitView
			>
				<Background gap={15} className="bg-background" color="#555" />
				<Controls
					showZoom={false}
					showFitView={false}
					showInteractive={false}
					fitViewOptions={fitViewOptions}
					onZoomIn={() => {
						zoomIn({ duration: 500 });
					}}
					onZoomOut={() => {
						zoomOut({ duration: 500 });
					}}
				>
					<ControlButton onClick={() => zoomIn({ duration: 500 })}>
						<PlusIcon />
					</ControlButton>
					<ControlButton onClick={() => zoomOut({ duration: 500 })}>
						<MinusIcon />
					</ControlButton>
					<ControlButton onClick={() => fitView({ duration: 500 })}>
						<MaximizeIcon />
					</ControlButton>
				</Controls>
			</ReactFlow>
		</div>
	);
};

export default Chitra;
