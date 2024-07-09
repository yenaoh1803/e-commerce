import "./App.scss";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routers/AppRoutes";
import { useDispatch } from "react-redux";
import { handleRefresh } from "./redux/actions/userAction";

function App() {
  // const dataUserRedux = useSelector((state) => state.user.account);
  // console.log(">>> check redux: ", dataUserRedux);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleRefresh());
    }
  }, []);
  return (
    <div className="app-container">
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}

export default App;
