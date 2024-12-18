import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/inter";
import "@fontsource/inter/900.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/500.css";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
