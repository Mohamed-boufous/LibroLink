import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import EmailVerificationNotif from "./EmailVerificationNotif";
import Singup from "./Singup";
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
]);

export default router;
