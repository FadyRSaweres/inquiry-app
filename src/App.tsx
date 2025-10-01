import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inquiry from "./pages/Inquiry";
import Crud from "./pages/Crud";
import Login from "./pages/Login";
import chekCookie from "../utils/checkCookie";
import NoAccessPage from "./pages/NoAccessPage";

export default function App() {
  const isAuth: boolean = chekCookie();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="inquiry-app"
          element={!isAuth ? <Login /> : <NoAccessPage />}
        />
        <Route
          path="inquiry-app/home"
          element={isAuth ? <Home /> : <NoAccessPage />}
        />
        <Route
          path="inquiry-app/home/inquiry"
          element={isAuth ? <Inquiry /> : <NoAccessPage />}
        />
        <Route
          path="inquiry-app/home/crud"
          element={isAuth ? <Crud /> : <NoAccessPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
