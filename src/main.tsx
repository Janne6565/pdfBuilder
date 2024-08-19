import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {StyledEngineProvider, ThemeProvider} from "@mui/material";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import theme from "./Theme.tsx";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
                <App/>
            </StyledEngineProvider>
        </ThemeProvider>
    </StrictMode>
);