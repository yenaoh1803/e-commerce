import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../services/AdminService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import Header from "../Header";
import "../../scss/TableProduct.scss";

const TableProducts = () => {
  const [listProducts, setListProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProduct, setTotalProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [query, setQuery] = useState("");

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalProduct / itemsPerPage));
  }, [totalProduct]);

  const getProducts = async (page) => {
    let res = await fetchAllProducts(page);
    console.log("res >>>", res);
    if (res && res.data) {
      // setTotalPages(res.data.length);
      setTotalProducts(res.data.length);
      setListProducts(res.data);
    }
  };

  const _ = require("lodash");

  const handleUpdateTable = (item) => {
    setListProducts([item, ...listProducts]);
  };
  const handleUpdateTableFromModal = (item) => {
    let cloneListProducts = _.cloneDeep(listProducts);
    let index = listProducts.findIndex((item) => item.id === item.id);
    cloneListProducts[index].title = item.title;
    setListProducts(cloneListProducts);
    console.log(">>edit index", index);
    console.log("Check clone>> :", cloneListProducts);
  };
  const handleDeleteTableFromModal = (item) => {
    let cloneListProducts = _.cloneDeep(listProducts);
    cloneListProducts = cloneListProducts.filter((item) => item.id !== item.id);
    setListProducts(cloneListProducts);
    console.log("Deleted clone>> :", cloneListProducts);
  };

  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
    getProducts(currentPage);
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
            <ModalAddNew handleUpdateTable={handleUpdateTable} />
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
              <th>
                {/* <div className="sort-header" style={{ border: "none" }}> */}
                Name
                {/* <i
                    className="fa fa-sort"
                    style={{ border: "none", paddingLeft: "20px" }}
                  ></i>
                </div> */}
              </th>
              <th>
                {/* <div className="sort-header" style={{ border: "none" }}>
                  <span style={{ border: "none" }}>Price</span>
                  <span>
                    <i
                      className="fa fa-sort"
                      style={{ border: "none", paddingLeft: "20px" }}
                    ></i>
                  </span>
                </div> */}
                Price
              </th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="custom-tbody">
            {listProducts &&
              listProducts.length > 0 &&
              listProducts
                .filter((post) => {
                  if (query === "") {
                    return post;
                  } else if (
                    post.title.toLowerCase().includes(query.toLowerCase())
                  ) {
                    return post;
                  }
                })
                .slice(startIndex, endIndex)
                .map((item, index) => {
                  return (
                    <tr key={`item${index}`}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                      <td>{item.description}</td>
                      <td>{item.category}</td>
                      <td className="align-middle">
                        <div className="d-flex justify-content-center">
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{
                              height: "5rem",
                              maxWidth: "6rem",
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <div id="custom-button">
                          <ModalEdit
                            item={item}
                            handleUpdateTable={handleUpdateTable}
                            handleUpdateTableFromModal={
                              handleUpdateTableFromModal
                            }
                          />
                          <ModalDelete
                            item={item}
                            handleUpdateTable={handleUpdateTable}
                            handleDeleteTableFromModal={
                              handleDeleteTableFromModal
                            }
                          />
                        </div>
                      </td>
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
export default TableProducts;
