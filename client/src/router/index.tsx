import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import Logout from "@/pages/Logout";
import TaskBoard from "@/pages/TaskBoard";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Navigate to='/register' />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/logout" element={<Logout />} />
          <Route path="/task" element={<TaskBoard />} />
        </Route>

        <Route path="*" element={<Navigate to='/login' />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Router;