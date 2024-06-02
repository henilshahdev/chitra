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
			],
		},
		type: "entity",
	},
];

export const initialEdges: Edge[] = [];

export const onBoardingSteps = [
	{
		selector: ".first-step",
		header: "Welcome to Chitra",
		content: "Create stunning ERDs with extreme ease.",
	},
	{
		selector: ".second-step",
		header: "The Canvas",
		content: "This is where you will see the Entities and their Attributes.",
	},
	{
		selector: ".third-step",
		header: "Control Buttons",
		content: "By clicking these you can create new Entities and Attributes.",
	},
	{
		selector: ".fourth-step",
		header: "The Configuration",
		content: "Here you can change your Entity Names and modify the Attribute Properties.",
	},
	{
		selector: ".fifth-step",
		header: "The Viewport",
		content: "Zoom In, Zoom Out or Fit your view based on your total Entities.",
	},
	{
		selector: ".sixth-step",
		header: "Download Your Diagram",
		content: "Click this to download '.png' image once done designing the diagram.",
	},
	{
		selector: ".seventh-step",
		header: "Info & Help",
		content: "Click here for more help. That's a wrap! Enjoy creating diagrams",
	},
];
