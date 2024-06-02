import React from "react";
import { components } from "@reactour/tour";
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "lucide-react";

export function ContentComponent(props) {
	const isFirstStep = props.currentStep === 0;
	const isLastStep = props.currentStep === props.steps.length - 1;

	return (
		<div className="max-w-72 bg-popover/50 text-popover-foreground p-4 rounded-lg">
			<div className="w-full flex justify-between items-center">
				<p className="font-semibold text-primary">{props.steps[props.currentStep].header}</p>
				<XIcon
					onClick={() => {
						props.setIsOpen(false);
					}}
					className="h-5 w-5 rounded-sm hover:cursor-pointer hover:bg-popover-foreground hover:text-popover transition-colors"
				/>
			</div>
			<div className="mt-3">{props.steps[props.currentStep].content}</div>
			<div className="mt-6 w-full flex justify-between items-center">
				<ArrowLeftIcon
					onClick={() => {
						if (!isFirstStep) {
							props.setCurrentStep((s) => s - 1);
						}
					}}
					className={` ${
						isFirstStep ? "invisible" : "visible"
					} h-5 w-5 rounded-full hover:cursor-pointer hover:bg-popover-foreground hover:text-popover transition-colors`}
				/>
				<ArrowRightIcon
					className={` ${
						isLastStep ? "invisible" : "visible"
					} h-5 w-5 rounded-full hover:cursor-pointer hover:bg-popover-foreground hover:text-popover transition-colors`}
					onClick={() => {
						if (!isLastStep) {
							props.setCurrentStep((s) => s + 1);
						}
					}}
				/>
			</div>
		</div>
	);
}

export function Badge({ children }: any) {
	return (
		<components.Badge
			styles={{
				badge: (base) => ({
					...base,
					backgroundColor: "#16a34a",
					paddingInline: "16px",
					fontWeight: "bold",
					fontSize: "14px",
				}),
			}}
		>
			{children}
		</components.Badge>
	);
}

export function Close({ onClick }) {
	return (
		<components.Close
			onClick={onClick}
			styles={{
				close: (close) => ({
					...close,
					position: "absolute",
					right: 12,
					top: 12,
					width: 12,
					height: 12,
					backgroundColorColor: "transparent",
					color: "hsl(var(--muted-foreground))",
				}),
			}}
		></components.Close>
	);
}
