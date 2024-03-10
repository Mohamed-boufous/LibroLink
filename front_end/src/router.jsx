import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import EmailVerificationNotif from "./components/EmailVerificationNotif";
import Signup from "./components/Signup";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
