import { lazy } from "react";
const customer = lazy(() => import("../pages/customers/Customer"));
const returnItem = lazy(() => import("../pages/returns/Return"));
const Statistic = lazy(() => import("../pages/statistics/Statistic"));
const product = lazy(() => import("../pages/products/Product"));
const addProduct = lazy(() => import("../pages/products/AddProduct"));
const productDetail = lazy(() => import("../pages/products/ProductDetail"));
const employee = lazy(() => import("../pages/empoyeis/Employee"));

const adminRoutes = [
  //   { part: "/dashboard", component: dashboard, role: "admin" },
  { path: "customer", component: customer, role: "admin" },
  { path: "return", component: returnItem, role: "admin" },
  { path: "statistic", component: Statistic, role: "admin" },
  { path: "product", component: product, role: "admin" },
  { path: "product/new", component: addProduct, role: "admin" },
  { path: "product/:id", component: productDetail, role: "admin" },
  { path: "employee", component: employee, role: "admin" },
];
export default adminRoutes;