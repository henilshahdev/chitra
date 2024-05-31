import React from "react";

import { NodeProps, Position } from "reactflow";
import CustomHandle from "./CustomHandle";
import { EntityNodeProps } from "@/types";

const EntityNode = ({ data: { entityName, attributes }, selected }: NodeProps<EntityNodeProps>) => {
	return (
		<div
			className={` ${
				selected ? "ring ring-green-500 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900" : ""
			} text-start bg-foreground text-background rounded-lg border text-sm`}
		>
			<p className="px-2 py-1 font-semibold">{entityName}</p>
			<table className="w-full table-auto bg-background text-foreground rounded-b-lg">
				<tbody>
					{attributes.map((eachAttribute, index) => (
						<tr key={index}>
							<td className="px-2 py-1.5 text-xs text-left rounded-b-lg">{eachAttribute.name}</td>
							<td className="px-2 py-1.5 text-xs text-end uppercase rounded-b-lg">
								{eachAttribute.type}
							</td>
							<td className="px-2 py-1.5 text-xs text-end rounded-b-lg">{eachAttribute.constraint}</td>
						</tr>
					))}
				</tbody>
			</table>
			<CustomHandle type="target" position={Position.Left} />
			<CustomHandle type="source" position={Position.Right} />
		</div>
	);
};

export default EntityNode;
