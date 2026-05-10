import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./styles/globals.css";

// On enveloppe toute l'application dans BrowserRouter
// pour que React Router puisse gérer les URLs
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);