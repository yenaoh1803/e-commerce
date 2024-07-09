import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-bootstrap/Modal";
import { postEditProduct } from "../../services/AdminService";
import { toast } from "react-toastify";
import "../../scss/EditButton.scss";

const ModalEdit = (props) => {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [dataProductEdit, setDataProductEdit] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const { item, handleUpdateTableFromModal } = props;
  const handleEditProduct = (item) => {
    console.log(item);
    setDataProductEdit(item);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    handleEditProduct(item);
  };

  const handleEditProductInfo = async () => {
    let res = await postEditProduct(
      productName,
      price,
      description,
      image,
      category
    );
    if (res && res.data) {
      handleUpdateTableFromModal({
        title: productName,
        price: price,
        description: description,
        image: image,
        category: category,
      });

      handleClose();

      toast.success("An Product Updated!");
    }
  };
  useEffect(() => {
    if (show) {
      setProductName(dataProductEdit.title);
      setPrice(dataProductEdit.price);
      setImage(dataProductEdit.image);
      setDescription(dataProductEdit.description);
      setCategory(dataProductEdit.category);
    }
  }, [show, dataProductEdit]);
  return (
    <>
      {/* <Button onClick={handleShow} className="edit">
        <i className="fa fa-pen-square"></i>
      </Button> */}
      <IconButton aria-label="edit" onClick={handleShow}>
        <EditIcon />
      </IconButton>
      <Modal
        className="custom-modal"
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit a product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="text"
                className="form-control"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => handleEditProductInfo()}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEdit;
