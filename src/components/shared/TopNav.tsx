import React from "react";

import { useReactFlow } from "reactflow";
import { AppProps } from "@/types";

import { Button } from "../ui/button";

import { Theme } from "./Theme";
import { useTheme } from "next-themes";

import { HandMetalIcon, InfoIcon, MenuIcon } from "lucide-react";

import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import LeftNav from "./LeftNav";

const TopNav = ({ selectedEntity, setSelectedEntity }: AppProps) => {
	const { setNodes } = useReactFlow();
	const { theme } = useTheme();

	return (
		<header className="w-full flex justify-between h-[57px] items-center gap-1 border-b bg-background px-4">
			<div className="flex justify-start items-center space-x-1">
				<Button asChild variant="ghost" size="icon" aria-label="Logo" className="p-1">
					<img src="/logo.svg" alt="Chitra Logo" />
				</Button>
				<h1 className="text-xl font-semibold">Chitra</h1>
			</div>
			<div>
				<Drawer>
					<Button asChild variant="outline" size="sm" className="lg:hidden gap-1.5">
						<DrawerTrigger>
							<MenuIcon className="size-5" />
							Config
						</DrawerTrigger>
					</Button>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle className="text-center">Configuration</DrawerTitle>
							<DrawerDescription className="text-center">
								Edit the Entities & Attributes.
							</DrawerDescription>
							<LeftNav selectedEntity={selectedEntity} setSelectedEntity={setSelectedEntity} />
						</DrawerHeader>
					</DrawerContent>
				</Drawer>
			</div>
			<div className="w-max flex justify-center items-center space-x-2">
				<Theme />
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="sm" className="gap-1.5">
							<InfoIcon className="size-5" />
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
									I&apos;m continuously working on new features, so stay tuned for updates! Your
									feedback is very appreciated. Dive in and let me know what you think!
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
										window.open("https://discord.gg/G6tmPFmG", "_blank").focus();
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
