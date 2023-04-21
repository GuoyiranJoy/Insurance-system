import { lazy } from "react";

const appRouter = [
  {
    path: "main/*",
    element: lazy(() => import("../pages/Main")),
  },
  {
    path: "login",
    element: lazy(() => import("../pages/Login")),
  },
  {
    path: "*",
    element: lazy(() => import("../components/NotFound")),
  },
];

export default appRouter;
