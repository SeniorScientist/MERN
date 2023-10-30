import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import Home from "@/pages/Home";
import Logout from "@/pages/Logout";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;