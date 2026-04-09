import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// REVIEW: This file imports from "react-router-dom" but App.jsx imports Routes/Route from "react-router". Pick one package and use it consistently.
import { HashRouter } from "react-router-dom";
// REVIEW: index.css is imported here but the file is completely empty. Either add styles or remove this import.
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
