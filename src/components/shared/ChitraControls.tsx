import React from "react";

import { CirclePlusIcon, SquarePlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ChitraControlsProps } from "@/types";

const ChitraControls = ({ addNewEntity, addNewAttribute }: ChitraControlsProps) => {
	return (
		<span className="third-step">
			<div className="flex justify-between items-center">
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
		</span>
	);
};

export default ChitraControls;
