import { lazy } from "react";
const customer = lazy(() => import("../pages/customers/Customer"));
const returnItem = lazy(() => import("../pages/returns/Return"));
const Statistic = lazy(() => import("../pages/statistics/Statistic"));
const product = lazy(() => import("../pages/products/Product"));
const detail = lazy(() => import("../pages/details/Detail"));
const employee = lazy(() => import("../pages/empoyeis/Employee"));

const adminRoutes = [
  //   { part: "/dashboard", component: dashboard, role: "admin" },
  { path: "customer", component: customer, role: "admin" },
  { path: "return", component: returnItem, role: "admin" },
  { path: "statistic", component: Statistic, role: "admin" },
  { path: "product", component: product, role: "admin" },
  { path: "product/:id", component: detail, role: "admin" },
  { path: "employee", component: employee, role: "admin" },
];
export default adminRoutes;
