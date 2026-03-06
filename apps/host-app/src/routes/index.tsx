import { createBrowserRouter } from "react-router-dom";
import CmsLayout from "./../layouts/CmsLayout";
import DashboardPage from "./../pages/DashboardPage";
import ReactPage from "./../pages/ReactPage";
import VuePage from "./../pages/VuePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CmsLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "react-app", element: <ReactPage /> },
      { path: "vue-app", element: <VuePage /> },
    ],
  },
]);

export default router;