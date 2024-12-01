import React, { useEffect, useState } from "react";
import Loader, { SpinnerImg } from "../../loader/Loader";
import { SlEyeglass } from "react-icons/sl";
import { LiaEdit } from "react-icons/lia";
import { IoTrashOutline } from "react-icons/io5";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";

/**
 * ProductList component for displaying a list of products with filtering and pagination.
 * @param {Object} props - Component properties.
 * @param {Object[]} props.products - Array of product objects.
 * @param {boolean} props.isLoading - Loading indicator.
 * @returns {JSX.Element} - Rendered ProductList component.
 */
const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();

  /**
   * Shorten text to a specified length.
   * @param {string} text - Text to be shortened.
   * @param {number} n - Maximum length of the text.
   * @returns {string} - Shortened text.
   */
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  /**
   * Delete a product.
   * @param {string} id - Product ID.
   */
  const delProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  /**
   * Confirm product deletion.
   * @param {string} id - Product ID.
   */
  const confirmDelete = (id) => {
    confirmAlert({
      message: "¿Seguro quieres eliminar este producto?",
      buttons: [
        {
          label: "Eliminar",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancelar",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  // Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const itemsPerPage = 15;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = event.selected;
    setCurrentPage(newOffset); // Update current page when clicking pagination
    setItemOffset(newOffset * itemsPerPage);
  };
  // End Pagination

  useEffect(() => {
    if (search === "") {
      // If the filter is cleared, restore the previous page
      setItemOffset(prevPage * itemsPerPage);
      setCurrentPage(prevPage);
    } else {
      // Save the current page before applying the filter
      setPrevPage(currentPage);
    }

    dispatch(FILTER_PRODUCTS({ products, search }));
    setItemOffset(0);
    setCurrentPage(0);
  }, [products, search, dispatch]);

  return (
    <>
      <div className="">
        <div className="product-list">
          <div className="table">
            <div className="--flex-between --flex-dir-column">
              <span>
                <h3>Productos</h3>
              </span>
              <span>
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
            </div>
            {isLoading && <Loader />}

            <div className="table">
              {!isLoading && products.length === 0 ? (
                <p>-- No se encontraron productos, Por favor Agrega algunos...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Referencia</th>
                      <th>Nombre</th>
                      <th>Categoria</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Valor</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((product /* , index */) => {
                      const { _id, name, sku, category, price, quantity } = product;
                      return (
                        <tr key={_id}>
                          <td>{sku}</td>
                          <td>{shortenText(name, 18)}</td>
                          <td>{category}</td>
                          <td className="align-right">
                            {"$"}
                            {Number(price).toLocaleString("es-CO")}
                          </td>
                          <td className="align-right">
                            {Number(quantity).toLocaleString("es-CO")}
                          </td>
                          <td className="align-right">
                            {"$"}
                            {(price * quantity).toLocaleString("es-CO")}
                          </td>
                          <td className="icons">
                            <span>
                              <Link to={`/product-detail/${_id}`} title="Detalles">
                                <SlEyeglass size={25} color="#000000" />
                              </Link>
                            </span>
                            <span>
                              <Link to={`/edit-product/${_id}`} title="Editar">
                                <LiaEdit size={30} color="#000000" />
                              </Link>
                            </span>
                            <span>
                              <IoTrashOutline
                                title="Eliminar"
                                size={25}
                                onClick={() => confirmDelete(_id)}
                                color="#000000"
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            <ReactPaginate
              breakLabel="..."
              nextLabel="Siguiente"
              forcePage={currentPage}
              onPageChange={handlePageClick}
              pageRangeDisplayed={10}
              pageCount={pageCount}
              previousLabel="Anterior"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="activePage"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
