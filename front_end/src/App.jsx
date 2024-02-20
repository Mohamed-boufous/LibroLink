import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Singup from "./Singup";
import EmailVerificationNotif from "./EmailVerificationNotif";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/singup" element={<Singup />} />
        </Routes>
        <Routes>
          <Route
            exact
            path="/verify-email?"
            element={<EmailVerificationNotif />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
