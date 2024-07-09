import { Routes, Route } from "react-router-dom";
import TableProducts from "../components/manager/TableProducts";
import TableUsers from "../components/manager/TableUsers";
import Login from "../components/Login";
import ShowItems from "../components/customer/ShowItems";
import Cart from "../components/customer/Cart";
import PrivateRoute from "./PrivateRoute";
import UserInfo from "../components/customer/UserInfo";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ShowItems />} />
        <Route path="/login" element={<Login />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/user_info" element={<UserInfo />} />
        <Route
          path="/manage_products"
          element={
            <PrivateRoute>
              <TableProducts />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/manage_users"
          element={
            <PrivateRoute>
              <TableUsers />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
