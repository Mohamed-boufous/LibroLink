import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import EmailVerificationNotif from "./components/EmailVerificationNotif";
import Singup from "./components/Singup";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/singup",
    element: <Singup />,
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
