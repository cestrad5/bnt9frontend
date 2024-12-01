import React, { useEffect, useState } from 'react';
import axios from "axios";
import heroImg from '../../assets/logo.svg';
const BACKEND_URL = import.meta.env.VITE_BACKEND;
const API_URL = `${BACKEND_URL}/api/orders/order`;

/**
 * Pdfview component for displaying details of an order in a PDF-like format.
 * @param {Object} props - Component props.
 * @param {string} props.orderId - ID of the order to display details for.
 * @returns {JSX.Element} - Rendered Pdfview component.
 */
const Pdfview = ({ orderId }) => {
  const [dataOrder, setDataOrder] = useState({});

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios.get(API_URL + "/" + orderId);
        const data = response.data.order;
        setDataOrder(data);
      } catch (error) {
        console.error("Error al obtener la orden:", error);
      }
    };

    if (orderId) {
      getOrder();
    }
  }, [orderId]);

  return (
    <div style={{
      backgroundColor: "white",
      padding: "50px"
    }}>
      {dataOrder.order ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between"
          }}>
            <div>
              <p>Pedido = <span>REF-{dataOrder._id.slice(-8)}</span></p>
              <p>Fecha: {new Date(dataOrder.createdAt).toLocaleDateString("es-ES")}</p>
              <p>Cliente: <span>{dataOrder.customer}</span> </p>
              <p>Productos:</p>
            </div>
            <div className='logo'>
              <img src={heroImg} alt='Logo Bonneto con Amor' style={{
                width: "100px",
                textAlign: "center"
              }} />
            </div>
          </div>
          <div>
            {Array.isArray(dataOrder.order) &&
              dataOrder.order.map((item, index) => (
                <div key={index} style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <img src={item.product.image.filePath} alt="imagen" style={{
                    width: "150px",
                    marginRight: "50px",
                    marginBottom: "-10px"
                  }} />
                  <div className="info" style={{ padding: "20px" }}>
                    <p style={{ fontWeight: 'bold' }}>Nombre: <span> {item.product.name}</span></p>
                    <p style={{ fontWeight: 'bold' }}>Ref: <span> {item.product.sku}</span></p>
                    <p style={{ fontWeight: 'bold' }}>Precio und: <span>{item.product.price}</span> </p>
                    <p style={{ fontWeight: 'bold' }}>Cantidad solicitada: <span> {item.quantity} </span></p>
                  </div>
                </div>
              ))}
          </div>
          <p style={{ fontWeight: 'bold', marginBottom: "20px" }}>Nota: <span> {dataOrder.note}</span></p>
          <p style={{ fontWeight: 'bold' }}>Valor Total: <span> {dataOrder.total}</span></p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Pdfview;
