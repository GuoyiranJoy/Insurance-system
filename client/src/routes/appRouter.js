import { lazy } from "react";

const appRouter = [
  {
    path: "main/*",
    component: lazy(() => import("../pages/Main")),
  },
  {
    path: "login",
    component: lazy(() => import("../pages/Login")),
  },
  {
    path: "*",
    component: lazy(() => import("../components/NotFound")),
  },
];

export default appRouter;
