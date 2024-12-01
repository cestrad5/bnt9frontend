import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/features/order/orderSlice";
import { getProducts } from "../../redux/features/product/productSlice";
import "./orderPdfList.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import PdfModal from "../pdfview/PdfModal";

const BACKEND_URL = import.meta.env.VITE_BACKEND;
const API_URL = `${BACKEND_URL}/api/orders/order`;

/**
 * Deletes an order with the specified ID.
 * @param {string} id - ID of the order to be deleted.
 * @returns {Promise} - Resolves to the deleted order data.
 */
const deleteOrder = async (id) => {
  const response = await axios.delete(API_URL + "/" + id);
  return response.data;
};

/**
 * OrderPdfList component for displaying a list of orders with PDF download functionality.
 * @returns {JSX.Element} - Rendered OrderPdfList component.
 */
const OrderPdfList = () => {
  const [data, setData] = useState(null);
  const [orderIds, setOrderIds] = useState([]);
  const [productData, setProductData] = useState([]);
  const [lastOrder, setLastOrder] = useState([]);
  const [verPdf, setVerPdf] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfModalOrderId, setPdfModalOrderId] = useState(null);
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    orderIdToDelete: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getOrders());
        const data = response.payload.order;
        setOrderIds(data.map((order) => order._id));
        setData(data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    if (orderIds.length === 0) {
      fetchData();
    }
  }, [dispatch, orderIds]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await dispatch(getProducts());
        const products = productResponse.payload;
        setProductData(products);
      } catch (error) {
        console.error("Error al obtener los datos de los productos:", error);
      }
    };

    if (productData.length === 0) {
      fetchData();
    }
  }, [dispatch]);

  /**
   * Gets the product name based on the product ID.
   * @param {string} productId - ID of the product.
   * @param {Array} productData - Array of product data.
   * @returns {string} - Product name or "No disponible" if not found.
   */
  function getProductByName(productId, productData) {
    const product = productData.find((product) => product._id === productId);
    return product ? product.name : "No disponible";
  }

  /**
   * Gets the product ID based on the product ID.
   * @param {string} productId - ID of the product.
   * @param {Array} productData - Array of product data.
   * @returns {string} - Product ID or "No disponible" if not found.
   */
  function getProductById(productId, productData) {
    const product = productData.find((product) => product._id === productId);
    return product ? product._id : "No disponible";
  }

  /**
   * Gets the product price formatted as currency.
   * @param {string} productId - ID of the product.
   * @param {Array} productData - Array of product data.
   * @returns {string} - Formatted product price or "No disponible" if not found.
   */
  function getProductByPrice(productId, productData) {
    const product = productData.find((product) => product._id === productId);
    return product ? Number(product.price).toLocaleString('es-CO') : "No disponible";
  }

  /**
   * Gets the product SKU based on the product ID.
   * @param {string} productId - ID of the product.
   * @param {Array} productData - Array of product data.
   * @returns {string} - Product SKU or "No disponible" if not found.
   */
  function getProductBySku(productId, productData) {
    const product = productData.find((product) => product._id === productId);
    return product ? product.sku : "No disponible";
  }

  /**
   * Gets the product image file path based on the product ID.
   * @param {string} productId - ID of the product.
   * @param {Array} productData - Array of product data.
   * @returns {string} - Product image file path or an empty string if not found.
   */
  function getProductImage(productId, productData) {
    const product = productData.find((product) => product._id === productId);
    return product ? product.image.filePath : "";
  }

  /**
   * Formats the currency amount.
   * @param {number} amount - Amount to be formatted.
   * @returns {string} - Formatted currency amount.
   */
  function formatCurrency(amount) {
    return amount.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
    });
  }

  /**
   * Handles the download of the PDF for a specific order.
   * @param {string} orderId - ID of the order.
   */
  const handleDownloadPDF = async (orderId) => {
    setPdfModalOrderId(orderId);
    setShowPdfModal(true);
  };

  /**
   * Closes the PDF modal.
   */
  const closePdfModal = () => {
    setPdfModalOrderId(null);
    setShowPdfModal(false);
  };

  const reversedOrderIds = [...orderIds].reverse();
  const totalPedidos = reversedOrderIds.length;

  return (
    <div className="datapedido">
      <ul>
        {reversedOrderIds.map((orderId, index) => {
          const order = data.find((order) => order._id === orderId);
          const reversedIndex = totalPedidos - index;

          return (
            <li key={orderId} className="datapedido-pedido">
              <div className="headerPedido">
                <div className="headerInfo">
                  <h4>
                    Pedido N°:{" "}
                    <span className="datapedido-p-name-num">
                      {reversedIndex}
                    </span>
                  </h4>
                  <h1 className="datapedido-p-cliente">
                    Cliente:{" "}
                    <span className="datapedido-p-name-cliente">
                      {order && order.customer}
                    </span>
                  </h1>
                </div>
                <div className="fechaBoton">
                  <h1 className="datapedido-p-cliente">
                    Fecha:{" "}
                    <span className="datapedido-p-name-cliente">
                      {order &&
                        new Date(order.createdAt).toLocaleDateString("es-ES")}
                    </span>
                  </h1>
                  <button
                    className="datapedido-p-finalizado"
                    onClick={() => handleDownloadPDF(orderId)}
                    data-id={orderId}
                  >
                    Ver PDF
                  </button>
                  <PdfModal
                    isOpen={showPdfModal}
                    onClose={closePdfModal}
                    orderId={pdfModalOrderId}
                  />
                </div>
              </div>

              {order &&
                order.order.map((item, index) => (
                  <div key={index} className="datapedido-product">
                    <div className="info">
                      <p className="datapedido-p">
                        Nombre:
                        <span className="datapedido-p-name">
                          {item.product
                            ? getProductByName(
                                item.product._id,
                                productData
                              )
                            : "No disponible"}
                        </span>
                      </p>
                      <p className="datapedido-p">
                        Ref:{" "}
                        <span className="datapedido-p-name">
                          {item.product
                            ? getProductBySku(
                                item.product._id,
                                productData
                              )
                            : "No disponible"}
                        </span>
                      </p>
                      <p className="datapedido-p">
                        Cantidad solicitada:{" "}
                        <span className="datapedido-p-name">
                          {item.quantity}
                        </span>
                      </p>
                      <p className="datapedido-p">
                        Precio und :
                        <span className="datapedido-p-name">
                          ${item.product
                            ? getProductByPrice(
                                item.product._id,
                                productData
                              )
                            : "No disponible"}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              <div className="infoCliente">
                <p className="datapedido-p">
                  Nota:{" "}
                  <span className="datapedido-p-name-note">
                    {order && order.note}
                  </span>
                </p>
                {order && order.total !== undefined && (
                  <p className="datapedido-p">
                    Valor Total Pedido :{" "}
                    <span className="datapedido-p-name-total">
                      ${Number(order.total).toLocaleString('es-CO')}
                    </span>
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderPdfList;
