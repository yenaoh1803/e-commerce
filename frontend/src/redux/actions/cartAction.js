import { getUserCart } from "../../services/CustomerService";
import { toast } from "react-toastify";

export const LOAD_CART = "LOAD_CART";
export const SAVE_CART = "SAVE_CART";

export const FETCH_CART_ERROR = "FETCH_CART_ERROR";
export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";

export const handleGetCart = (userId) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOAD_CART });

    let res = await getUserCart();
    console.log("> check user cart: ", res);
    if (res && res.data) {
      dispatch({
        type: FETCH_CART_SUCCESS,
        data: { userName: userName.trim(), token: res.data.token },
      });
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
      dispatch({ type: FETCH_CART_ERROR });
    }
  };
};

export const handleSaveCart = (userName, password) => {
  return async (dispatch, getState) => {
    toast.success("Log out");
    dispatch({ type: SAVE_CART });
  };
};
