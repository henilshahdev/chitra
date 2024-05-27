import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/globals.css";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider attribute="class" defaultTheme="system">
			<App />
		</ThemeProvider>
	</React.StrictMode>
);
