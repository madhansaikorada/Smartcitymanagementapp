import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CityInfoManagement from "./pages/admin/CityInfoManagement";
import PublicServicesManagement from "./pages/admin/PublicServicesManagement";
import InfrastructureMonitoring from "./pages/admin/InfrastructureMonitoring";
import UserDashboard from "./pages/user/UserDashboard";
import CityDetails from "./pages/user/CityDetails";
import ReportIssue from "./pages/user/ReportIssue";
import ProvideFeedback from "./pages/user/ProvideFeedback";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { 
        path: "admin",
        Component: AdminDashboard,
        children: [
          { index: true, Component: CityInfoManagement },
          { path: "city-info", Component: CityInfoManagement },
          { path: "public-services", Component: PublicServicesManagement },
          { path: "infrastructure", Component: InfrastructureMonitoring },
        ]
      },
      {
        path: "user",
        Component: UserDashboard,
        children: [
          { index: true, Component: CityDetails },
          { path: "city-details", Component: CityDetails },
          { path: "report-issue", Component: ReportIssue },
          { path: "feedback", Component: ProvideFeedback },
        ]
      },
      { path: "*", Component: NotFound },
    ],
  },
]);
