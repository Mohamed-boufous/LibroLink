import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Singup from "./Singup";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/singup" element={<Singup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
