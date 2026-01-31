import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import SEO from "./components/SEO";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <SEO title="Chartered Accountant Firm" />
      <App />
    </HelmetProvider>
  </StrictMode>
);
