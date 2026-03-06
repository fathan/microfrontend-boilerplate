import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// Pastikan NAMED export, bukan default
export function mount(el: HTMLElement) {
  const root = ReactDOM.createRoot(el);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}