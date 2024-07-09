import React, { useEffect, useState } from "react";
import { useCart, CartProvider } from "react-use-cart";
import { postCreateOrder } from "../../services/CustomerService";
import moment from "moment"; // hoặc import { format } from 'date-fns';
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import "../../scss/Cart.scss";

const Cart = () => {
  const cartId = localStorage.getItem("username");
  const [currentTime, setCurrentTime] = useState(new Date());

  const formattedDateTime = moment(currentTime).format(
    "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
  );

  let {
    items,
    isEmpty,

    totalUniqueItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  useEffect(() => {
    localStorage.setItem("totalItem", totalUniqueItems);
  }, [totalUniqueItems]);

  if (isEmpty)
    return <h1 className="text-center">Your cart has no item. Shop now!</h1>;

  const payAll = async () => {
    // Tạo danh sách các id và danh sách số lượng
    const listID = items.map((item) => item.id);
    const listQuantity = items.map((item) => item.quantity);
    console.log("listID >>>", listID);
    console.log("listQ", listQuantity);

    // Gửi yêu cầu đặt hàng
    let res = await postCreateOrder(
      "",
      listID,
      listQuantity,
      cartTotal,
      formattedDateTime,
      localStorage.getItem("token"),
      cartId
    );

    if (res && res.data.message) {
      toast.success("Ordered sucess");
      emptyCart();
    } else {
      alert("Error while ordering");
    }
  };

  return (
    <>
      <CartProvider>
        <section className="py-4 container">
          <div className="row justify-content-center">
            <div className="col-12">
              <h5>Cart ({totalUniqueItems})</h5>
              <Table
                className="table table-light table-hover m-0"
                style={{ height: "auto" }}
              >
                <tbody>
                  {items.map((item, index) => {
                    return (
                      <tr key={index} style={{ maxHeight: "8rem" }}>
                        <td>
                          <img
                            src={item.item.Image}
                            style={{ height: "6rem" }}
                          />
                        </td>
                        <td>{item.title}</td>
                        <td>Price: {item.price}</td>
                        <td>Quantity: {item.quantity}</td>
                        <td>
                          <div className="button-container">
                            <button
                              className="btn btn-info ms-2"
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </button>
                            <button
                              className="btn btn-info ms-2"
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => removeItem(item.id)}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div className="col-auto ms-auto">
              {/* <h5>Tổng sản phẩm: {totalItems}</h5> */}
              <h2>Total bill: ${cartTotal}</h2>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-danger m-2"
                onClick={() => emptyCart()}
              >
                Clear cart
              </button>
              <button
                className="btn btn-primary m-2"
                onClick={() => {
                  payAll();
                }}
              >
                Order
              </button>
            </div>
          </div>
        </section>
      </CartProvider>
    </>
  );
};
export default Cart;
