import Layout from "@/layout/Layout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      path: "*",
    },
  ],
  {
    basename: "/enghub",
  },
);

export default router;
