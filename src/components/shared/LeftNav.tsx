import { Node, useNodes, useOnSelectionChange, useReactFlow } from "reactflow";
import { AppProps, AttributeType } from "@/types";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "../ui/separator";
import { CirclePlusIcon, SquarePlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const LeftNav = ({ selectedEntity, setSelectedEntity }: AppProps) => {
	const nodes = useNodes();
	const { setNodes } = useReactFlow();

	useOnSelectionChange({
		onChange: ({ nodes }) => {
			if (nodes.length !== 0) {
				setSelectedEntity({ data: nodes[0].data, id: nodes[0].id });
			}
		},
	});

	const updateEntityName = (newEntityName: string) => {
		setNodes((nds) =>
			nds.map((node: Node) => {
				if (selectedEntity) {
					if (node.id === selectedEntity.id) {
						node.data = {
							...node.data,
							entityName: newEntityName,
						};
					}
				}

				return node;
			})
		);
	};

	const updateAttributeName = (id: number, value: string) => {
		setNodes((nds) =>
			nds.map((node: Node) => {
				if (selectedEntity) {
					if (node.id === selectedEntity.id) {
						node.data = {
							...node.data,
							attributes: node.data.attributes.map((attribute: AttributeType, index: number) =>
								index === id + 1 ? { ...attribute, name: value } : attribute
							),
						};
					}
				}
				return node;
			})
		);
	};

	const updateAttributeType = (id: number, value: string) => {
		setNodes((nds) =>
			nds.map((node: Node) => {
				if (selectedEntity) {
					if (node.id === selectedEntity.id) {
						node.data = {
							...node.data,
							attributes: node.data.attributes.map((attribute: AttributeType, index: number) =>
								index === id + 1 ? { ...attribute, type: value } : attribute
							),
						};
					}
				}
				return node;
			})
		);
	};

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

	const updateAttributeConstraint = (id: number, value: string) => {
		setNodes((nds) =>
			nds.map((node: Node) => {
				if (selectedEntity) {
					if (node.id === selectedEntity.id) {
						node.data = {
							...node.data,
							attributes: node.data.attributes.map((attribute: AttributeType, index: number) =>
								index === id + 1 ? { ...attribute, constraint: value } : attribute
							),
						};
					}
				}
				return node;
			})
		);
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
		<form id="entityForm">
			<div className="grid w-full items-start gap-6">
				<fieldset className="grid grid-cols-2 gap-6 rounded-lg border p-4">
					<legend className="-ml-1 px-1 text-sm font-medium">Controls</legend>
					<div className="grid gap-3 w-max mx-auto">
						<Button
							onClick={(e) => {
								e.preventDefault();
								addNewEntity();
							}}
							variant="outline"
							size="sm"
							className="gap-1.5 flex"
						>
							<SquarePlusIcon className="size-5" />
							New Entity
						</Button>
					</div>
					<div className="grid gap-3 w-max mx-auto">
						<Button
							onClick={(e) => {
								e.preventDefault();
								addNewAttribute();
							}}
							variant="outline"
							size="sm"
							className="gap-1.5"
						>
							<CirclePlusIcon className="size-5" />
							Add Attribute
						</Button>
					</div>
				</fieldset>
				<fieldset className="grid gap-6 rounded-lg border p-4">
					<legend className="-ml-1 px-1 text-sm font-medium">Entities</legend>
					<div className="grid gap-3">
						<Label htmlFor="entityName">Entity Name</Label>
						<Input
							onChange={(e) => {
								updateEntityName(e.target.value);
							}}
							id="entityName"
							type="text"
							placeholder="User | Admin | Students..."
							defaultValue={nodes
								.filter((node: Node) => node.selected)
								.map((node: Node) => node.data.entityName)
								.join("")}
						/>
					</div>
				</fieldset>
				<fieldset className="grid gap-6 rounded-lg border p-4">
					<legend className="-ml-1 px-1 text-sm font-medium">Attributes</legend>
					<div className="grid gap-3">
						<ScrollArea className="w-full h-fit rounded-md border">
							<div className="grid grid-cols-3 gap-x-4 items-center">
								<p className="h-12 p-4 text-center font-medium text-muted-foreground text-sm">Column</p>
								<p className="h-12 p-4 text-center font-medium text-muted-foreground text-sm">Type</p>
								<p className="h-12 p-4 text-center font-medium text-muted-foreground text-sm">
									Constraint
								</p>
							</div>
							{selectedEntity ? (
								<div className="grid grid-cols-3 gap-x-4 items-center">
									<p className="h-12 p-4 text-center font-medium text-muted-foreground text-sm">id</p>
									<p className="h-12 p-4 text-center font-medium text-muted-foreground text-sm">
										int
									</p>
									<p className="h-12 p-4 text-center font-medium text-muted-foreground text-sm">PK</p>
								</div>
							) : (
								<></>
							)}
							{nodes.map((node: Node) => {
								if (node.selected) {
									return node.data.attributes
										.slice(1)
										.map((eachAttribute: AttributeType, index: number) => (
											<div
												key={index}
												className="grid grid-cols-3 gap-x-3 items-center px-3 py-2"
											>
												<Input
													className="w-28 h-10 mx-auto"
													onChange={(e) => {
														updateAttributeName(index, e.target.value);
													}}
													id="attributeName"
													type="text"
													placeholder="name | phone | createdAt..."
													defaultValue={eachAttribute.name}
												/>
												<Select
													onValueChange={(e) => {
														updateAttributeType(index, e);
													}}
												>
													<SelectTrigger className="w-28 h-10">
														<SelectValue
															defaultValue={eachAttribute.type}
															placeholder="Type"
														/>
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="INT">INT</SelectItem>
														<SelectItem value="SMALLINT">SMALLINT</SelectItem>
														<SelectItem value="BIGINT">BIGINT</SelectItem>
														<Separator />
														<SelectItem value="VARCHAR">VARCHAR</SelectItem>
														<SelectItem value="TEXT">TEXT</SelectItem>
														<Separator />
														<SelectItem value="BOOLEAN">BOOLEAN</SelectItem>
														<Separator />
														<SelectItem value="DATE">DATE</SelectItem>
														<SelectItem value="TIME">TIME</SelectItem>
														<SelectItem value="DATETIME">DATETIME</SelectItem>
													</SelectContent>
												</Select>
												<Select
													onValueChange={(e) => {
														updateAttributeConstraint(index, e);
													}}
												>
													<SelectTrigger className="w-28 h-10">
														<SelectValue
															defaultValue={eachAttribute.constraint}
															placeholder="Constraint"
														/>
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="-">-</SelectItem>
														<SelectItem value="PK">PK</SelectItem>
														<SelectItem value="FK">FK</SelectItem>
													</SelectContent>
												</Select>
											</div>
										));
								}
							})}
						</ScrollArea>
					</div>
				</fieldset>
			</div>
		</form>
	);
};

export default LeftNav;
