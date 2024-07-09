import React, { useState } from "react";
import Header from "./Header";
import Login from "./Login";
// import { useNavigate } from "react-router-dom";
import "../scss/Home.scss";

const Home = () => {
  // const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Header />

      <table className="grid grid-cols-2">
        <tbody>
          <tr>
            <td className="col-span-1 center-button">
              <h1 className="text-center">LA'DH</h1>
              {/* <h6 className="text-center">
                Mua sắm dễ dàng, vận chuyển nhanh chóng
              </h6> */}
              <button className="custom-button" onClick={handleClick}>
                SHOP NOW
              </button>
              <div
                className={`toggle-element ${isVisible ? "visible" : "hidden"}`}
              >
                <Login />
              </div>
            </td>
            <td className="col-span-1">
              <img src={require("../assets/noodles.png")} alt="Noodles" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Home;
