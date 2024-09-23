import { createBrowserRouter } from "react-router-dom";

//component pages
// import Profile from "./pages/Profile";
import History from "./pages/History";
import DataUpload from "./pages/DataUpload";
import Energy from "./pages/Energy";
import Result from "./pages/Result";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/signUp";
import Ecom from "./pages/Ecom";
import UserManagement from "./pages/UserManagement";

//independent pages
import LandingPage from "./pages/LandingPage";
import EsewaError from "./pages/EsewaError";
import EsewaSuccess from "./pages/EsewaSuccess";
//TODO- 404 page

//parent layouts
import GuestLayout from "./layouts/GuestLayout";
import UserLayout from "./layouts/UserLayout";
import HistoryDetail from "./pages/HistoryDetail";

//router paths
const router = createBrowserRouter([
  //independent page

  {
    path: "/",
    element: <LandingPage />,
  },

  //guest
  {
    path: "/guest",
    element: <GuestLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
      {
        path: "/guest",
        element: <Login />,
      },
    ],
  },

  //user
  {
    path: "/home",
    element: <UserLayout />,
    children: [
      {
        path: "dashboard",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      // {
      //   path: "profile",
      //   element: <Profile />,
      // },
      {
        path:"ecom",
        element : <Ecom />
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "result",
        element: <Result />,
      },
      {
        path: "energy",
        element: <Energy />,
      },
      {
        path: "upload",
        element: <DataUpload />,
      },
      {
        path: "detail/:dataId",
        element : <HistoryDetail />
      },
      {
        path:"user-manage",
        element: <UserManagement />
      }
    ],
  },
  {
    path: "/esewa-payment-error",
    element : <EsewaError />
  },
  {
    path : "/esewa-payment-success",
    element : <EsewaSuccess />
  }
]);
export default router;
