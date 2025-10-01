import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inquiry from "./pages/Inquiry";
import Crud from "./pages/Crud";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inquiry-app" element={<Home />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/crud" element={<Crud />} />
      </Routes>
    </BrowserRouter>
  );
}
