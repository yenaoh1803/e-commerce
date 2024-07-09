import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-bootstrap/Modal";
import { putUpdateInfo } from "../../services/CustomerService";
import { toast } from "react-toastify";
import "../../scss/EditButton.scss";

const ModalUpdateInfo = (props) => {
  const [show, setShow] = useState(false);
  const [ID, setID] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [phone, setPhone] = useState("");
  const [dataUserEdit, setDataUserEdit] = useState([]);

  const { item } = props;
  const handleEditInfo = (item) => {
    console.log(item);
    setDataUserEdit(item);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    handleEditInfo(item);
  };

  const handleEditUserInfo = async () => {
    let res = await putUpdateInfo(
      ID,
      email,
      username,
      password,
      firstname,
      lastname,
      city,
      street,
      number,
      zipcode,
      lat,
      long,
      phone
    );
    console.log("> check edit user: ", res);
    if (res && res.data) {
      handleClose();
      toast.success("Update successfully!");
    }
  };
  useEffect(() => {
    if (show) {
      setID(dataUserEdit.id);
      setUsername(dataUserEdit.username);
      setEmail(dataUserEdit.email);
      setPassword(dataUserEdit.password);
      setFirstname(dataUserEdit.name.firstname);
      setLastname(dataUserEdit.name.lastname);
      setCity(dataUserEdit.address.city);
      setStreet(dataUserEdit.address.street);
      setNumber(dataUserEdit.address.number);
      setZipcode(dataUserEdit.address.zipcode);
      setLat(dataUserEdit.address.geolocation.lat);
      setLong(dataUserEdit.address.geolocation.long);
      setPhone(dataUserEdit.phone);
    }
  }, [show, dataUserEdit]);
  return (
    <>
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
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="text"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Firstname</label>
              <input
                type="text"
                className="form-control"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Lastname</label>
              <input
                type="text"
                className="form-control"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Street</label>
              <input
                type="text"
                className="form-control"
                value={street}
                onChange={(event) => setStreet(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Number</label>
              <input
                type="text"
                className="form-control"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Zipcode</label>
              <input
                type="text"
                className="form-control"
                value={zipcode}
                onChange={(event) => setZipcode(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Lat</label>
              <input
                type="text"
                className="form-control"
                value={lat}
                onChange={(event) => setLat(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Long</label>
              <input
                type="text"
                className="form-control"
                value={long}
                onChange={(event) => setLong(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
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
            onClick={() => handleEditUserInfo()}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateInfo;
