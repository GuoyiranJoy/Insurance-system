import { lazy } from "react";

const contentRouter = [
  {
    path: "/manage-agency-insurance-rate",
    component: lazy(() =>
      import("../components/agency-insurance-rate/manage/ManageAgency")
    ),
  },
  {
    path: "/manage-underwriting-rules",
    component: lazy(() =>
      import("../components/underwriting-rules/UnderwritingRules")
    ),
  },
  {
    path: "/manage-car-insurance-rate",
    component: lazy(() =>
      import("../components/car-insurance-rate/CarInsuranceRate")
    ),
  },
  {
    path: "/manage-settlement-rate",
    component: lazy(() =>
      import("../components/settlement-rate/SettlementRate")
    ),
  },
  {
    path: "/import-agency-insurance-rate",
    component: lazy(() =>
      import(
        "../components/agency-insurance-rate/query-or-import/QueryImportAgency"
      )
    ),
  },
];

export default contentRouter;
