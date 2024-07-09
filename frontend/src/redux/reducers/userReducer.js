import {
  FETCH_USER_ERROR,
  FETCH_USER_LOGIN,
  FETCH_USER_SUCCESS,
  USER_LOGOUT,
  USER_REFRESH,
} from "../actions/userAction";

const INITIAL_STATE = {
  account: { userName: "", token: "", auth: null },
  isLoading: false,
  isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case FETCH_USER_SUCCESS:
      console.log(">>> check action: ", action);
      return {
        ...state,
        account: {
          userName: action.data.userName,
          token: action.data.token,
          auth: true,
        },
        isLoading: false,
        isError: false,
      };

    case FETCH_USER_ERROR:
      return {
        ...state,
        account: { auth: false },
        isLoading: false,
        isError: true,
      };

    case USER_LOGOUT:
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("manager");
      localStorage.removeItem("totalItem");
      return {
        ...state,
        account: {
          userName: "",
          token: "",
          auth: false,
        },
      };

    case USER_REFRESH:
      return {
        ...state,
        account: {
          userName: localStorage.getItem("username"),
          token: localStorage.getItem("token"),
          auth: true,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
