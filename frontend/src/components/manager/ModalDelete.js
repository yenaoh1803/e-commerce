import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-bootstrap/Modal";
import { deleteProduct } from "../../services/AdminService";
import { toast } from "react-toastify";

const ModalDelete = (props) => {
  const [show, setShow] = useState(false);
  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [dataProductDelete, setDataProductDelete] = useState([]);

  const { item, handleDeleteTableFromModal } = props;
  const handleEditProduct = (item) => {
    console.log(item);
    setDataProductDelete(item);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    handleEditProduct(item);
  };

  const handleDeleteProduct = async () => {
    let res = await deleteProduct(dataProductDelete.id);
    // console.log(">>res: ", res);

    handleDeleteTableFromModal(dataProductDelete);
    let string = "Delete item id" + String(dataProductDelete.id);
    handleClose();

    window.location.reload();
    toast.success(string);
  };
  useEffect(() => {
    if (show) {
      setProductName(dataProductDelete.title);
      setPrice(dataProductDelete.price);
      setImage(dataProductDelete.image);
    }
  }, [dataProductDelete]);
  return (
    <>
      <IconButton aria-label="delete" onClick={handleShow}>
        <DeleteIcon />
      </IconButton>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete a product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>Are you sure?</form>
          <br />
          <b>Name: {productName}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => handleDeleteProduct()}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;
