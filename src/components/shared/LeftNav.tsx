import React from "react";

import { Node, useNodes, useOnSelectionChange, useReactFlow } from "reactflow";
import { AppProps, AttributeType } from "@/types";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "../ui/separator";

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

	return (
		<form id="entityForm">
			<div className="grid w-full items-start gap-3 lg:gap-6">
				<span className="fourth-step">
					<fieldset className="grid gap-3 lg:gap-6 rounded-lg border-0 lg:border p-4">
						<legend className="hidden lg:block -ml-1 px-1 text-sm font-medium">Entities</legend>
						<div className="grid gap-3">
							<Label className="text-start" htmlFor="entityName">
								Entity Name
							</Label>
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

					<fieldset className="grid gap-3 rounded-lg border-0 lg:border p-4">
						<legend className="hidden lg:block -ml-1 px-1 text-sm font-medium">Attributes</legend>
						<Label className="text-start lg:hidden" htmlFor="entityName">
							Attributes
						</Label>
						<div className="grid gap-x-3">
							<ScrollArea className="w-full h-fit rounded-md border">
								<div className="grid grid-cols-3 gap-x-4 items-center px-4 pt-4">
									<p className="h-9 text-center font-medium text-muted-foreground text-sm">Column</p>
									<p className="h-9 text-center font-medium text-muted-foreground text-sm">Type</p>
									<p className="h-9 text-center font-medium text-muted-foreground text-sm">
										Constraint
									</p>
								</div>
								<Separator />
								{selectedEntity ? (
									<div className="grid grid-cols-3 gap-x-4 items-center px-4 pt-4">
										<p className="h-9 text-center font-medium text-muted-foreground text-sm">id</p>
										<p className="h-9 text-center font-medium text-muted-foreground text-sm">int</p>
										<p className="h-9 text-center font-medium text-muted-foreground text-sm">PK</p>
									</div>
								) : (
									<></>
								)}
								<div className="px-4 pt-4">
									{nodes.map((node: Node) => {
										if (node.selected) {
											return node.data.attributes
												.slice(1)
												.map((eachAttribute: AttributeType, index: number) => (
													<div
														key={index}
														className="grid grid-cols-3 gap-x-3 items-center mb-4"
													>
														<Input
															className="w-full mx-auto"
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
															<SelectTrigger className="w-full">
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
								</div>
							</ScrollArea>
						</div>
					</fieldset>
				</span>
			</div>
		</form>
	);
};

export default LeftNav;
