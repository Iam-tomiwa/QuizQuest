import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import ToastContextWrap from "contexts/ToastContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastContextWrap>
      <App />
    </ToastContextWrap>
  </React.StrictMode>
);
