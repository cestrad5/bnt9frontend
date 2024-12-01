import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/features/order/orderSlice";
import { getProducts } from "../../redux/features/product/productSlice";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND;
const API_URL = `${BACKEND_URL}/api/orders/order`;

/**
 * Delete order by sending a request to the server.
 * @param {string} id - Order ID to be deleted.
 * @returns {Promise} - Promise representing the delete request.
 */
const deleteOrder = async (id) => {
  const response = await axios.delete(API_URL + "/" + id);
  return response.data;
};

/**
 * OrdersList component for displaying a list of orders with details.
 * @returns {JSX.Element} - Rendered OrdersList component.
 */
const OrdersList = () => {
  const [data, setData] = useState(null);
  const [orderIds, setOrderIds] = useState([]);
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();

  const [shouldUpdateOrders, setShouldUpdateOrders] = useState(false);

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

    if (orderIds.length === 0 || shouldUpdateOrders) {
      fetchData();
      setShouldUpdateOrders(true);
    }
  }, [dispatch, orderIds, shouldUpdateOrders]);

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
   * Get product name by ID.
   * @param {string} productId - Product ID.
   * @param {Object[]} productData - Array of product data.
   * @returns {string} - Product name or "No disponible" if not found.
   */
  function getProductByName(productId, productData) {
    const product = productData.find((product) => product._id === productId);
    return product ? product.name : "No disponible";
  }

  /**
   * Get product ID by ID.
   * @param {string} productId - Product ID.
   * @param {Object[]} productData - Array of product data.
   * @returns {string} - Product ID or "No disponible" if not found.
   */
  function getProductById(productId, productData) {
    const product = productData.find((product) => product._id === productId);
    return product ? product._id : "No disponible";
  }

  /**
   * Get product SKU by ID.
   * @param {string} productId - Product ID.
   * @param {Object[]} productData - Array of product data.
   * @returns {string} - Product SKU or "No disponible" if not found.
   */
  function getProductBySku(productId, productData) {
    const product = productData.find((product) => product._id === productId);
    return product ? product.sku : "No disponible";
  }

  /**
   * Get product image URL by ID.
   * @param {string} productId - Product ID.
   * @param {Object[]} productData - Array of product data.
   * @returns {string} - Product image URL or "" if not found.
   */
  function getProductImage(productId, productData) {
    const product = productData.find((product) => product._id === productId);
    return product ? product.image.filePath : "";
  }

  return (
    <div className="danos">
      <ul>
        {orderIds.map((orderId, index) => {
          const order = data.find((order) => order._id === orderId);
          return (
            <li key={orderId} className="danos-pedido">
              <h4>
                Pedido N°: <span className="danos-p-name"> {index + 1}</span>
              </h4>
              {order &&
                order.order.map((item, index) => (
                  <div key={index} className="pedido-item">
                    <div className="div-check">
                      <input
                        type="checkbox"
                        id={`cbox${orderId}-${
                          item.product
                            ? getProductById(item.product._id, productData)
                            : "No disponible"
                        }`}
                        className="checkbox"
                        value="first_checkbox"
                        onChange={(e) => {
                          const checkbox = e.target;
                          const text = checkbox.checked
                            ? "Cumplido"
                            : "Pendiente";
                          const textElement = checkbox.nextSibling;
                          textElement.textContent = text;
                        }}
                      />
                      <p>Pendiente</p>
                    </div>
                    <div className="info">
                      <p className="danos-p-name">
                        {item.product
                          ? getProductByName(item.product._id, productData)
                          : "No disponible"}
                      </p>
                      <p className="danos-p">
                        Ref:{" "}
                        <span>
                          {item.product
                            ? getProductBySku(item.product._id, productData)
                            : "No disponible"}
                        </span>
                      </p>
                      <p className="danos-p">
                        Cantidad solicitada:{" "}
                        <span className="danos-p-name">{item.quantity}</span>
                      </p>
                    </div>
                    <div className="sesionb">
                      <img
                        className="danos-img"
                        src={
                          item.product &&
                          getProductImage(item.product._id, productData)
                        }
                        alt="Imagen del producto"
                      />
                    </div>
                  </div>
                ))}
              <div className="infoCliente">
                <p className="danos-p">
                  Cliente: <span> {order && order.customer}</span>
                </p>
                <p className="danos-p">
                  Nota: <span> {order && order.note}</span>
                </p>
              </div>
              <div className="alta">
                <button
                  className="danos-p-finalizado"
                  onClick={() => {
                    if (order) {
                      const orderId = order._id;
                      // Show the toast.info to confirm the order
                      toast.info(
                        <div className="confirmation-notification">
                          ¿Deseas confirmar el pedido?
                          <br />
                          <div
                            className="accept-button"
                            onClick={async () => {
                              try {
                                // Logic to confirm the order
                                await deleteOrder(orderId);
                                setShouldUpdateOrders(true);
                                toast.dismiss(); // Close the notification
                                toast.success("Pedido completado satisfactoriamente");
                              } catch (error) {
                                toast.error("Hubo un error al completar el pedido");
                                console.error("Error al eliminar el pedido:", error);
                              }
                            }}
                          >
                            Aceptar
                          </div>
                          <div
                            className="cancel-button"
                            onClick={() => {
                              toast.dismiss(); // Close the notification without making changes
                            }}
                          >
                            Cancelar
                          </div>
                        </div>,
                        {
                          position: "top-center",
                          autoClose: false,
                          closeOnClick: false,
                          hideProgressBar: true,
                          pauseOnHover: false,
                          draggable: false,
                          closeButton: false,
                        }
                      );
                    }
                  }}
                >
                  PEDIDO FINALIZADO
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default OrdersList;
