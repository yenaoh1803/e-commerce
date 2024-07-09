import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../services/AdminService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import Header from "../Header";
import "../../scss/TableProduct.scss";

const TableUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUser, setTotalUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [query, setQuery] = useState("");

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalUser / itemsPerPage));
  }, [totalUser]);

  const getUsers = async (page) => {
    let res = await fetchAllUsers(page);
    console.log("res >>>", res);
    if (res && res.data) {
      setTotalUsers(res.data.length);
      setListUsers(res.data);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
    getUsers(currentPage);
  };

  return (
    <>
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
              placeholder="Search..."
              onChange={(event) => setQuery(event.target.value)}
            />
          </span>
          <div className="func-button">
            {/* <ModalAddNew handleUpdateTable={handleUpdateTable} /> */}
          </div>
        </div>
      </div>

      <div
        className="customize-table"
        style={{
          paddingTop: "160px",
        }}
      >
        <Table striped bordered hover style={{ height: "auto" }}>
          <thead id="custom-thead">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
              <th>Fullname</th>
              <th>Address</th>
              <th>Phone</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody id="custom-tbody">
            {listUsers &&
              listUsers.length > 0 &&
              listUsers
                .filter((post) => {
                  if (query === "") {
                    return post;
                  } else if (
                    (post.phone &&
                      post.phone.toLowerCase().includes(query.toLowerCase())) ||
                    (post.email &&
                      post.email.toLowerCase().includes(query.toLowerCase())) ||
                    (post.username &&
                      post.username.toLowerCase().includes(query.toLowerCase()))
                  ) {
                    return post;
                  }
                })
                .slice(startIndex, endIndex)
                .map((item, index) => {
                  return (
                    <tr key={`item${index}`}>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.username}</td>
                      <td>
                        {item.name.firstname} {item.name.lastname}
                      </td>
                      <td>
                        {item.address.number} {item.address.street},{" "}
                        {item.address.city}
                      </td>
                      <td>{item.phone}</td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      </div>
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
export default TableUsers;
