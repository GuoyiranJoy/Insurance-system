import { lazy } from "react";

const contentRouter = [
  {
    path: "/manage-agency-insurance-rate",
    element: lazy(() =>
      import("../components/agency-insurance-rate/manage/ManageAgency")
    ),
  },
  {
    path: "/manage-underwriting-rules",
    element: lazy(() =>
      import("../components/underwriting-rules/UnderwritingRules")
    ),
  },
  {
    path: "/manage-car-insurance-rate",
    element: lazy(() =>
      import("../components/car-insurance-rate/CarInsuranceRate")
    ),
  },
  {
    path: "/manage-settlement-rate",
    element: lazy(() => import("../components/settlement-rate/SettlementRate")),
  },
  {
    path: "/import-agency-insurance-rate",
    element: lazy(() =>
      import(
        "../components/agency-insurance-rate/query-or-import/QueryImportAgency"
      )
    ),
  },
  {
    path: "*",
    element: lazy(() => import("../components/NotFound")),
  },
];

export default contentRouter;
