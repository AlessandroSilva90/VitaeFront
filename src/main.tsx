import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router/router.tsx";

import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <div className="content"> */}
      <RouterProvider router={Router} />
    {/* </div> */}
  </StrictMode>,
);
