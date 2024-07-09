import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import { fetchAllProducts } from "../../services/AdminService";
import Header from "../Header";
import { CartProvider } from "react-use-cart";
import Cart from "./Cart";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../scss/ShowItems.scss";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ShowItems = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.account);

  useEffect(() => {
    const handleClick = () => {
      if (user && user.auth === null) {
        // click anywhere to navigate login page
        navigate("/login");
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [user]);

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalProducts / itemsPerPage));
  }, [totalProducts]);

  const getProducts = async (page) => {
    let res = await fetchAllProducts(page);
    console.log("res>>>", res);
    if (res && res.data) {
      setProducts(res.data);
      setTotalProducts(res.data.length); // Đây không phải là tổng số sản phẩm, mà là độ dài của mảng dữ liệu trả về
    }
  };

  const handlePageClick = (event) => {
    console.log("event_lib:", event);
    setCurrentPage(+event.selected + 1);
    getProducts(currentPage); // thêm dấu + ở đầu: convert str sang number
  };

  const handleSetCategory = () => {
    setCategory("");
  };

  return (
    <>
      <CartProvider>
        <div
          style={{
            position: "fixed",
            padding: "3px 0",
            width: "80%",
            backgroundColor: "#ffffff",
            zIndex: 1000,
          }}
        >
          <Header />
          <div className="d-sm-flex justify-content-between">
            <span>
              <input
                className="form-control"
                placeholder="Tìm kiếm..."
                onChange={(event) => setQuery(event.target.value)}
              />
            </span>
            <div className="func-button" onClick={handleShow}>
              <IconButton aria-label="cart">
                <Badge
                  badgeContent={localStorage.getItem("totalItem")}
                  max={99}
                  color="secondary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
          </div>
        </div>

        <div
          style={{
            paddingTop: "160px",
          }}
        >
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
            className="custom-slider"
          >
            <Carousel
              showArrows={true}
              showThumbs={false}
              showStatus={false}
              showIndicators={true}
              infiniteLoop={true}
              autoPlay={true}
              interval={2000}
            >
              <div onClick={() => setCategory("men's clothing")}>
                <img
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/264e3629894817.5609864fcd16d.png"
                  alt="Slide 1"
                />
                <p className="legend">Men's Clothing</p>
              </div>
              <div onClick={() => setCategory("women's clothing")}>
                <img
                  src="https://1.bp.blogspot.com/-K2rAfFUTuiU/XsO9bDiUJ6I/AAAAAAAAB94/K-qZAwIyYGUfCX4IOKbKMvTH25JCHmMXwCLcBGAsYHQ/s1600/44179397316295.5ec28bdc05409.jpg"
                  alt="Slide 2"
                />
                <p className="legend">Women's Clothing</p>
              </div>
              <div onClick={() => setCategory("jewelery")}>
                <img
                  src="https://thegoldmarket.co.uk/wp-content/uploads/2017/01/jewellery-banner-redo-2-1.jpg"
                  alt="Slide 3"
                />
                <p className="legend">Jewelery</p>
              </div>
              <div onClick={() => setCategory("electronics")}>
                <img
                  src={require("../../assets/electronicbanner.png")}
                  alt="Slide 4"
                />
                <p className="legend">Electronics</p>
              </div>
            </Carousel>
          </div>

          <Modal
            show={show}
            onHide={handleClose}
            animation={false}
            size="xl"
            className="custom-modal"
          >
            <Modal.Header closeButton style={{ backgroundColor: "#debb9c" }}>
              <Modal.Title>Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body
              className="modal-dialog-scrollable"
              style={{ height: "70vh", overflow: "auto" }}
            >
              <Cart />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                backgroundColor: "white",
                color: "#8b4513",
                border: "none",
              }}
              onClick={handleSetCategory}
            >
              <h1 className="text-center">All Products</h1>
            </Button>
          </div>

          <section className="py-3 container">
            <div className="row justify-content-center">
              {products &&
                products.length > 0 &&
                products
                  .filter((item) => {
                    if (query === "" && category === "") {
                      return item;
                    } else if (
                      query &&
                      item.title.toLowerCase().includes(query.toLowerCase())
                    ) {
                      return item;
                    } else if (category && item.category === category) {
                      return item;
                    }
                  })
                  .slice(startIndex, endIndex)
                  .map((item, index) => {
                    return (
                      <ItemCard
                        img={item.image}
                        title={item.title}
                        price={item.price}
                        item={item}
                        key={index}
                      />
                    );
                  })}
            </div>
          </section>
        </div>
      </CartProvider>
      <div className="paginate d-flex justify-content-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </>
  );
};

export default ShowItems;
