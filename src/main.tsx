import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import TodoWrapper from "./components/TodoWrapper";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <TodoWrapper />
    </RecoilRoot>
  </React.StrictMode>
);
