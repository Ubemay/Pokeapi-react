import "./index.css";
import ReactDOM from "react-dom";
import AppRouter from "./appRouter/AppRouter";
import React from "react";

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById("root")
);
