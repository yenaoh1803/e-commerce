import { loginApi } from "../../services/AdminService";
import { toast } from "react-toastify";

export const USER_LOGOUT = "USER_LOGOUT";
export const USER_REFRESH = "USER_REFRESH";

export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

export const handleLoginRedux = (userName, password) => {
  return async (dispatch, getState) => {
    try {
      const res = await loginApi(userName.trim(), password);
      console.log("> check res login: ", res);

      dispatch({ type: "FETCH_USER_LOGIN" });

      if (res && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", userName.trim());

        if (userName.trim() === "mor_2314" && password.trim() === "83r5^_") {
          localStorage.setItem("manager", res.data.token);
        }

        dispatch({
          type: "FETCH_USER_SUCCESS",
          data: { userName: userName.trim(), token: res.data.token },
        });
      } else {
        toast.error("Login failed. Please check your credentials.");
        dispatch({ type: "FETCH_USER_ERROR" });
      }
    } catch (error) {
      console.error("Login error: ", error);
      toast.error("Login failed. Please check your credentials.");
      dispatch({ type: "FETCH_USER_ERROR" });
    }
  };
};

export const handleLogoutRedux = () => {
  return async (dispatch, getState) => {
    toast.success("Log out");
    dispatch({ type: USER_LOGOUT });

    // localStorage.clear();
  };
};

export const handleRefresh = () => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_REFRESH });
  };
};
