import { Node, Edge } from "reactflow";

export const proOptions = { hideAttribution: true };

export const imageWidth = 1920;
export const imageHeight = 1080;

export const initialNodes: Node[] = [
	{
		id: "1",
		position: { x: 100, y: 100 },
		data: {
			entityName: "User",
			attributes: [
				{ name: "id", type: "int", constraint: "PK" },
				{ name: "username", type: "varchar", constraint: "-" },
				{ name: "email", type: "varchar", constraint: "-" },
				{ name: "password", type: "varchar", constraint: "-" },
				{ name: "createdAt", type: "datetime", constraint: "-" },
				{ name: "updatedAt", type: "datetime", constraint: "-" },
			],
		},
		type: "entity",
	},
];

export const initialEdges: Edge[] = [];
