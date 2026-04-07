import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Home/Home";
import AllUser from "../pages/Users/AllUser/AllUser";
import AllPayments from "../pages/Payments/AllPayments/AllPayments";
import UserProfile from "../pages/UserProfile/UserProfile";
import BasicTask from "../pages/Tasks/BasicTask/BasicTask";
import AddTask from "../pages/Tasks/AddTaskForm/AddTask";
import EditTask from "../pages/Tasks/EditTask/EditTask";
import Gateway from "../pages/Gateway/Gateway";
import Offer from "../pages/Offer/Offer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "all-users",
        element: <AllUser />,
      },
      {
        path: "all-payments",
        element: <AllPayments />,
      },
      {
        path: "/user",
        element: <UserProfile />,
      },
      {
        path: "/task",
        element: <BasicTask />,
      },
      {
        path: "/add-task",
        element: <AddTask />,
      },
      {
        path: "/edit-task/:taskId",
        element: <EditTask />,
      },
      {
        path: "/gateway",
        element: <Gateway />,
      },
      {
        path: "/Offer",
        element: <Offer />,
      },
    ],
  },
]);
