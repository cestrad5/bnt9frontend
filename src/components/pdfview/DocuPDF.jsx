import React, { useEffect, useState } from 'react';
import axios from "axios";
import heroImg from '../../assets/logo.png';
import { Document, Page, View, Text, Image } from '@react-pdf/renderer';

const BACKEND_URL = import.meta.env.VITE_BACKEND;
const API_URL = `${BACKEND_URL}/api/orders/order`;

/**
 * DocuPDF component for generating a PDF document for a specific order.
 * @param {Object} props - Component props.
 * @param {string} props.orderId - ID of the order to generate the PDF for.
 * @returns {JSX.Element} - Rendered DocuPDF component.
 */
const DocuPDF = ({ orderId }) => {
  const [dataOrder, setDataOrder] = useState({});

  useEffect(() => {
    /**
     * Fetches the order data from the backend.
     */
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
    <Document >
      <Page size="A4">
        <View style={{
          backgroundColor: "white",
          padding: "30px"
        }}>
          {dataOrder.order ? (
            <View style={{
              display: "flex",
              flexDirection: "column",
            }}>
              <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
                <View style={{
                  fontSize: "12px"
                }}>
                  <Text >Pedido = <Text>REF-{dataOrder._id.slice(-8)}</Text></Text>
                  <Text style={{ fontSize: "18px", fontWeight: 'bold' }}>Cliente: <Text>{dataOrder.customer}</Text> </Text>
                  <Text style={{ fontSize: "12px" }}>Fecha: {new Date(dataOrder.createdAt).toLocaleDateString("es-ES")}</Text>
                  <Text style={{ fontSize: "14px", fontWeight: 'bold' }}>Productos:</Text>
                </View>
                <Image src={heroImg} alt='Logo Bonneto con Amor' style={{
                  width: "80px",
                  textAlign: "center"
                }} />
              </View>
              <View>
                {Array.isArray(dataOrder.order) &&
                  dataOrder.order.map((item, index) => (
                    <View key={index} style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "12px"
                    }}>
                      <Image src={item.product.image.filePath} alt="imagen" style={{
                        width: "150px",
                        marginRight: "50px",
                        marginBottom: "-10px"
                      }} />
                      <View className="info" style={{ padding: "20px", fontSize: "12px" }}>
                        <Text style={{ fontWeight: 'bold' }}>Nombre: <Text> {item.product.name}</Text></Text>
                        <Text style={{ fontWeight: 'bold' }}>Ref: <Text> {item.product.sku}</Text></Text>
                        <Text style={{ fontWeight: 'bold' }}>Tamaño: <Text> {item.product.description}</Text></Text>
                        <Text style={{ fontWeight: 'bold' }}>
                          Precio und: <Text>
                            {item.product && item.product.price
                              ? `$${item.product.price.toLocaleString("es-CO")}`
                              : "No disponible"}
                          </Text>
                        </Text>
                        <Text style={{ fontWeight: 'bold' }}>Cantidad solicitada: <Text> {item.quantity} </Text></Text>
                      </View>
                    </View>
                  ))}
              </View>
              <Text style={{ fontWeight: 'bold', marginBottom: "20px", fontSize: "12px", textAlign:"justify" }}>Nota: <Text> {dataOrder.note}</Text></Text>
              <Text style={{ fontWeight: 'bold', fontSize: "14px" }}>
                Valor Total: <Text>
                  {dataOrder.total ? `$${dataOrder.total.toLocaleString("es-CO")}` : "No disponible"}
                </Text>
              </Text>
            </View>
          ) : (
            <Text>Cargando...</Text>
          )}
        </View>
      </Page>
    </Document>
  )
}

export default DocuPDF;
