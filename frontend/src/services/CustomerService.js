import axios from "./customize_axios";

// const token = localStorage.access_token;

// products

const getUserCart = (userId) => {
  return axios.get(`https://fakestoreapi.com/carts/user/${userId}`);
};
const getUserInfo = (userId) => {
  return axios.get(`https://fakestoreapi.com/users/${userId}`);
};

const postCreateOrder = (
  orderID,
  productID,
  quantity,
  totalPrice,
  orderDate,
  customerID
) => {
  return axios.post("/customer_order", {
    orderID,
    productID,
    quantity,
    totalPrice,
    orderDate,
    customerID,
  });
};

const putUpdateInfo = (
  userId,
  email,
  username,
  password,
  firstname,
  lastname,
  city,
  street,
  number,
  zipcode,
  lat,
  long,
  phone
) => {
  return axios.put(`https://fakestoreapi.com/users/${userId}`, {
    id: userId,
    email,
    username,
    password,
    name: {
      firstname,
      lastname,
    },
    address: {
      city,
      street,
      number,
      zipcode,
      geolocation: {
        lat,
        long,
      },
    },
    phone,
  });
};

export { postCreateOrder, getUserCart, getUserInfo, putUpdateInfo };
