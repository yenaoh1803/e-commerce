import axios from "./customize_axios";
//get method

const fetchAllUsers = () => {
  return axios.get("https://fakestoreapi.com/users");
};

const fetchAllProducts = () => {
  return axios.get("https://fakestoreapi.com/products");
};

const fetchJewelery = () => {
  return axios.get("https://fakestoreapi.com/products/category/jewelery");
};

//post method
const postNewProduct = (title, price, description, image, category) => {
  //{"ProductName" : product.name, "ProductID" : product.id, "Price" : product.price, "Image": product.image}
  return axios.post("https://fakestoreapi.com/products", {
    title,
    price,
    description,
    image,
    category,
  });
};
const postEditProduct = (title, price, description, image, category) => {
  return axios.put("https://fakestoreapi.com/products/7", {
    title,
    price,
    description,
    image,
    category,
  });
};

//delete method

const deleteProduct = (id) => {
  return axios.delete(`https://fakestoreapi.com/products/${id}`);
};

const loginApi = (username, password) => {
  return axios.post("https://fakestoreapi.com/auth/login", {
    username,
    password,
  });
};

export {
  fetchAllUsers,
  fetchAllProducts,
  fetchJewelery,
  postNewProduct,
  postEditProduct,
  deleteProduct,
  loginApi,
};
