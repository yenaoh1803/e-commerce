import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postNewProduct } from "../../services/AdminService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { handleUpdateTable } = props;
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSaveChange = async () => {
    let res = await postNewProduct(
      productName,
      price,
      description,
      image,
      category
    );

    console.log(">>>> check res: ", res);
    if (res && res.data) {
      handleClose();
      setProductName("");

      setPrice(0);
      setCategory("");
      setDescription("");
      setImage("");
      toast.success("Add successfully!");
      handleUpdateTable({
        title: productName,
        price: price,
        description: description,
        image: image,
        category: category,
      });
    } else {
      alert("Lỗi");
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className="btn btn-success">
        <i className="fa-solid fa-circle-plus" />
        Add New Product
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
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
            onClick={() => handleSaveChange()}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
