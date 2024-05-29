import { useReactFlow } from "reactflow";
import { TopNavProps } from "@/types";

import { Button } from "../ui/button";

import { Theme } from "./Theme";
import { useTheme } from "next-themes";

import { HandMetalIcon, InfoIcon } from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

const TopNav = ({ selectedEntity }: TopNavProps) => {
	const { setNodes } = useReactFlow();
	const { theme } = useTheme();

	return (
		<header className="w-full flex justify-between h-[57px] items-center gap-1 border-b bg-background px-4">
			<div className="flex justify-start items-center space-x-3">
				<Button asChild variant="ghost" size="icon" aria-label="Logo" className="p-1">
					<img src="/logo.svg" alt="Chitra Logo" />
				</Button>
				<h1 className="text-xl font-semibold">Chitra</h1>
			</div>
			<div className="w-max flex justify-center items-center space-x-4">
				<Theme />
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="sm" className="gap-1.5">
							<InfoIcon className="size-5" />
							About
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle className="flex justify-start items-center space-x-3">
								<p>Hey there!</p>
								<HandMetalIcon />
							</DialogTitle>
							<DialogDescription>
								<p className="mt-6">
									Chitra focuses on creating intuitive and powerful entity relationship diagrams with
									extreme ease.
								</p>
								<p className="mt-6">
									I'm continuously working on new features, so stay tuned for updates! Your feedback
									is very appreciated. Dive in and let me know what you think!
								</p>
								<p className="mt-6">
									A big thanks to{" "}
									<a className="text-green-600 hover:underline" href="https://ui.shadcn.com/">
										@shadcn
									</a>{" "}
									and{" "}
									<a className="text-green-600 hover:underline" href="https://reactflow.dev/">
										@reactflow
									</a>{" "}
									for making this project possible.
								</p>
								<p className="mt-6">
									Facing any issues or want to get in touch? This is how you can reach me.{" "}
									<a className="text-green-600 hover:underline" href="mailto:henil.601@gmail.com">
										henil.601@gmail.com
									</a>
								</p>

								<Button
									onClick={() => {
										window.open("https://ui.shadcn.com/docs/components/button", "_blank").focus();
									}}
									variant="link"
									size="sm"
									className="mt-6 flex justify-start items-center space-x-3"
								>
									<img
										src={theme === "light" ? "/discord.svg" : "/discord_white.png"}
										alt="Discord Icon"
										width={20}
										height={20}
									/>
									<p>Join Discord</p>
								</Button>
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
		</header>
	);
};

export default TopNav;
