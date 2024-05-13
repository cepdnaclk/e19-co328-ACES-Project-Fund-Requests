import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/montserrat";
import "@fontsource/noto-sans";
import "@fontsource/outfit";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme} cssVarsRoot={undefined}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <GoogleOAuthProvider clientId="252888321357-ghuansbshvi532nlh58vfges4tdmd3uh.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
