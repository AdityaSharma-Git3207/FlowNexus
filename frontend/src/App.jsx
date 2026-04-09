import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import SubmitReport from "./pages/SubmitReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit-report" element={<SubmitReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;