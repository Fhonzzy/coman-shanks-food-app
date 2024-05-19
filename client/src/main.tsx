import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithNav from "./auth/Auth0ProviderWithNav";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Router>
			<Auth0ProviderWithNav>
				<AppRoutes />
			</Auth0ProviderWithNav>
		</Router>
	</React.StrictMode>
);
