import React from "react";

import { CirclePlusIcon, SquarePlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ChitraControlsProps } from "@/types";

const ChitraControls = ({ addNewEntity, addNewAttribute }: ChitraControlsProps) => {
	return (
		<div className="grid grid-cols-2 gap-6 px-4 pb-4">
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
		</div>
	);
};

export default ChitraControls;
