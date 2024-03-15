import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import EmailVerificationNotif from "./components/EmailVerificationNotif";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import Profile from "./components/Profile";

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
      }
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
  
  
]);

export default router;
