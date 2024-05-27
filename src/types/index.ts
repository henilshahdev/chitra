import { Edge, NodeTypes, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";

export type ChitraProps = {
	nodes: any[];
	edges: Edge[];
	onNodesChange: OnNodesChange;
	onEdgesChange: OnEdgesChange;
	onConnect: OnConnect;
	nodeTypes: NodeTypes;
};

export type AttributeType = {
	name: string;
	type: string;
	constraint: "PK" | "FK" | "-";
};

export type AppProps = {
	selectedEntity: EntityDataType | undefined;
	setSelectedEntity: React.Dispatch<React.SetStateAction<EntityDataType | undefined>>;
};

export type TopNavProps = {
	selectedEntity: EntityDataType | undefined;
};

export type EntityDataType = {
	id: string;
	data: {
		entityName: string;
		attributes: AttributeType[];
	};
};

export type EntityNodeProps = {
	entityName: string;
	attributes: AttributeType[];
	selected: boolean;
};
