import { createBrowserRouter } from "react-router-dom";
import App from "./views/App";
import EmailVerificationNotif from "./views/EmailVerificationNotif";
import Signup from "./views/Signup";
import Login from "./views/Login";
import Header from "./components/Header";
import Profile from "./views/Profile";
import FilterCatalogue from "./views/FilterCatalogue";
import LandingPage from "./views/LandingPage";
import HomePage from "./views/HomePage";
import EmailSentPage from "./views/EmailSentPage";
import InspectBook from "./views/InspectBook";
import AdminDashboard from "./views/AdminDashboard";
import AdminSideBar from "./components/AdminSideBar";
import AdminUsers from "./views/AdminUsers";
import AdminBooks from "./views/AdminBooks";
import AdminReports from "./views/AdminReports";
import AdminSubscriptions from "./views/AdminSubscriptions";
import AddNewBookForm from "./components/AddNewBookForm";
import PlansPage from "./views/PlansPage";
import ReadingBook from "./views/ReadingBook";
import IFrameReading from "./views/IFrameReading";
import BannedPage from "./views/BannedPage";
import BiblioPage from "./views/BiblioPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/book_filter",
        element: <FilterCatalogue />,
      },
      {
        path: "/landingpage",
        element: <LandingPage />,
      },
      {
        path: "/homepage",
        element: <HomePage />,
      },
      {
        path: "/book/:bookId",
        element: <InspectBook />,
      },
      {
        path: "/plans",
        element: <PlansPage />,
      },
      {
        path: "/reading",
        element: <ReadingBook />,
      },
      {
        path: "/biblio",
        element: <BiblioPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminSideBar />,
    children: [
      {
        path: "/admin/",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/Users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/Books",
        element: <AdminBooks />,
      },
      {
        path: "/admin/Reports",
        element: <AdminReports />,
      },
      {
        path: "/admin/Subscriptions",
        element: <AdminSubscriptions />,
      },
      {
        path: "/admin/addbook",
        element: <AddNewBookForm />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/verify-email?",
    element: <EmailVerificationNotif />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/email-sent",
    element: <EmailSentPage />,
  },
  {
    path: "/iframe",
    element: <IFrameReading />,
  },
  {
    path: "/banned",
    element: <BannedPage />,
  }
]);

export default router;
