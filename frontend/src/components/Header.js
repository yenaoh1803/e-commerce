import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../scss/Header.scss";
import { useSelector, useDispatch } from "react-redux";
import { handleLogoutRedux } from "../redux/actions/userAction";

const Header = () => {
  const user = useSelector((state) => state.user.account);
  console.log(">> user: ", user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(handleLogoutRedux());
  };

  useEffect(() => {
    if (user && user.auth === false && window.location.pathname !== "/login") {
      navigate("/");
      toast.success("Logouted");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#" className="navbar-brand">
            LA'DH
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="header-section">
              {!localStorage.getItem("token") && (
                <Nav.Link className=".nav-link" href="/login">
                  Sign in
                </Nav.Link>
              )}
              {!localStorage.getItem("token") && (
                <Nav.Link className=".nav-link" href="/register">
                  Sign up
                </Nav.Link>
              )}

              {localStorage.getItem("token") && (
                <Nav.Link className=".nav-link" href="/">
                  Home
                </Nav.Link>
              )}

              {localStorage.getItem("manager") && (
                <Nav.Link className=".nav-link" href="/manage_products">
                  Manage Products
                </Nav.Link>
              )}

              {localStorage.getItem("manager") && (
                <Nav.Link className=".nav-link" href="/manage_users">
                  Manage Users
                </Nav.Link>
              )}

              {localStorage.getItem("token") && (
                <NavDropdown
                  className="dropdown"
                  title={`Hello, ${user.userName}!`}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="/user_info">
                    My Account
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/" onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
