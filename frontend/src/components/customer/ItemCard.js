import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { toast } from "react-toastify";
import "../../scss/ItemCard.scss";
import "../../scss/ShowItems.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";

const ItemCard = (props) => {
  const { addItem, items, setItems } = useCart();
  const cartId = localStorage.getItem("username");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddCart = () => {
    addItem({
      item: props.item,
      id: props.item.id,
      price: props.price,
      title: props.title,
      cartId: cartId,
    });
    toast.success("Add an item to cart!");
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      const savedCart = localStorage.getItem(`cart-${cartId}`);

      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      setIsLoaded(true);
    }
  }, [setItems, cartId, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(`cart-${cartId}`, JSON.stringify(items));
    }
  }, [items, cartId, isLoaded]);

  return (
    <div className="col-11 col-md-6 col-lg-2 mx-0 mb-4">
      <div
        className="card p-0 overflow-hidden h-100 shadow align-items-center hover-border zoom-out"
        onClick={() => handleShow()}
      >
        <div className="card-body my-0 text-center">
          <img
            src={props.img}
            alt={props.title}
            className="card-img-top img-fluid"
            style={{
              maxHeight: "100px",
            }}
          />
        </div>
        <div className="card-body my-0 text-center">
          <h6 className="card-title">{props.title}</h6>
        </div>
        <div className="card-footer w-100 d-flex justify-content-between align-items-center">
          <p className="card-title mb-0 ml-3">{props.price}$</p>
          <button
            className="btn"
            style={{ backgroundColor: "#debb9c" }}
            onClick={() => handleAddCart()}
          >
            <i className="fa fa-cart-plus"></i>
          </button>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        size="lg"
        className="custom-modal"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#debb9c", textAlign: "center" }}
        >
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="modal-dialog-scrollable"
          style={{ height: "fit-content", overflow: "auto" }}
        >
          <div className="detail-item">
            <img src={props.img} alt={props.title} />
            <div>
              {props.item.description}
              <div className="item-description">
                <div>Price: ${props.price}</div>
                <button
                  className="btn"
                  style={{ backgroundColor: "#debb9c" }}
                  onClick={() => handleAddCart()}
                >
                  <i className="fa fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ItemCard;
