import React from "react";

import ReactFlow, {
	Background,
	ControlButton,
	Controls,
	getRectOfNodes,
	getTransformForBounds,
	useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";

import { ChitraProps } from "./types";

import { ArrowDownToLineIcon, MaximizeIcon, MinusIcon, PlusIcon } from "lucide-react";
import { imageHeight, imageWidth, proOptions } from "./constants";
import { toPng } from "html-to-image";

export type FitViewOptions = {
	padding: number;
	duration?: number;
	minZoom: number;
};

const fitViewOptions: FitViewOptions = {
	padding: 0,
	duration: 500,
	minZoom: 0,
};

const Chitra = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect, nodeTypes }: ChitraProps) => {
	const { zoomIn, zoomOut, fitView, getNodes } = useReactFlow();

	function downloadImage(dataUrl: string) {
		const a = document.createElement("a");

		a.setAttribute("download", "chitra.png");
		a.setAttribute("href", dataUrl);
		a.click();
	}

	const onDownloadClick = () => {
		const nodesBounds = getRectOfNodes(getNodes());
		const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

		const viewport: HTMLElement = document.querySelector(".react-flow__viewport")!;

		toPng(viewport, {
			backgroundColor: "#333",
			width: imageWidth,
			height: imageHeight,
			style: {
				width: imageWidth.toString(),
				height: imageHeight.toString(),
				transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
			},
		}).then(downloadImage);
	};

	return (
		<div className="w-full h-full border rounded-lg">
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
					position="bottom-right"
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
					<span className="fifth-step">
						<ControlButton onClick={() => zoomIn({ duration: 500 })}>
							<PlusIcon />
						</ControlButton>
						<ControlButton onClick={() => zoomOut({ duration: 500 })}>
							<MinusIcon />
						</ControlButton>
						<ControlButton onClick={() => fitView({ duration: 500 })}>
							<MaximizeIcon />
						</ControlButton>
					</span>
					<span className="sixth-step">
						<ControlButton onClick={onDownloadClick}>
							<ArrowDownToLineIcon />
						</ControlButton>
					</span>
				</Controls>
			</ReactFlow>
		</div>
	);
};

export default Chitra;
