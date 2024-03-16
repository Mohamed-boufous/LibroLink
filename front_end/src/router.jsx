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
        path: "/book_inspect",
        element: <InspectBook />,
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
    element: <EmailSentPage/>,
  }
]);

export default router;
