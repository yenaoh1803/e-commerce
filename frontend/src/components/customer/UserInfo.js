import { useState, useEffect } from "react";
import Header from "../Header";
import { getUserInfo, getUserCart } from "../../services/CustomerService";
import Table from "react-bootstrap/Table";
import "../../scss/UserInfo.scss";
import ModalUpdateInfo from "./ModalUpdateInfo";

const UserInfo = () => {
  const userId = 2;
  const [info, setInfo] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getUserInfo(userId);
      console.log("res >>>", res);
      if (res && res.data) {
        setInfo(res.data);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchCart = async () => {
      let res = await getUserCart(userId);
      console.log("res cart >>>", res);
      if (res && res.data) {
        setCart(res.data);
      }
    };

    fetchCart();
  }, [userId]);

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginLeft: "10%",
          marginRight: "10%",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h5>My Info</h5>

            <ModalUpdateInfo item={info}></ModalUpdateInfo>
          </div>

          {info && (
            <>
              <Table
                striped
                bordered
                hover
                style={{ height: "auto", width: "fit-content" }}
              >
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>{info.id}</td>
                  </tr>
                  <tr>
                    <td>Firstname</td>
                    <td>{info.name.firstname}</td>
                  </tr>

                  <tr>
                    <td>Lastname</td>
                    <td>{info.name.lastname}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{info.phone}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{info.email}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>
                      {info.address.number} {info.address.street},{" "}
                      {info.address.city}
                    </td>
                  </tr>
                  <tr>
                    <td>Username</td>
                    <td>{info.username}</td>
                  </tr>
                  <tr>
                    <td>Password</td>
                    <td>{info.password}</td>
                  </tr>
                </tbody>
              </Table>
            </>
          )}
        </div>
        <div>
          <h5>History</h5>
          <Table
            striped
            bordered
            hover
            style={{ height: "auto", width: "fit-content" }}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>ProductID</th>
                <th>Quantity</th>
              </tr>
            </thead>
            {cart &&
              cart.map((item, index) => {
                return (
                  <tbody key={`item${index}`}>
                    <tr>
                      <td colSpan={3}>ID: {item.id}</td>
                    </tr>
                    {item.products.map((product, id) => (
                      <tr key={`product${id}`}>
                        <td>{item.date}</td>
                        <td>{product.productId}</td>
                        <td>{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                );
              })}
          </Table>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
