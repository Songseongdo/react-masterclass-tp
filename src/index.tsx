import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";

const queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={darkTheme}>
					<App />
				</ThemeProvider>
			</QueryClientProvider>
		</RecoilRoot>
	</React.StrictMode>,
	document.getElementById("root")
);
