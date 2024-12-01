import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../card/CardSales.css';
import { FaRegTrashAlt } from 'react-icons/fa';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND;
const API_URL = `${BACKEND_URL}/api/orders/order`; 

/**
 * SalesOrder component for managing sales orders.
 * @returns {JSX.Element} - Rendered SalesOrder component.
 */
const SalesOrder = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [comments, setComments] = useState("");

  const [orderQuantities, setOrderQuantities] = useState({});

  const navigate = useNavigate();

  /**
   * Loads order items from localStorage.
   */
  const loadOrderItems = () => {
    const storageItems = Object.keys(localStorage).filter((key) => key.startsWith('orderItem-'));
    const newOrderItems = [];
    let total = 0;

    const quantities = { ...orderQuantities };

    for (const item of storageItems) {
      const orderItem = JSON.parse(localStorage.getItem(item));
      newOrderItems.push(orderItem);
      const quantity = quantities[orderItem.productId] || orderItem.quantity;
      total += orderItem.price * orderItem.quantity;
      quantities[orderItem.productId] = quantity;
    }

    setOrderItems(newOrderItems);
    setOrderQuantities(quantities);
    setTotalOrder(total);
  };

  /**
   * Handles quantity change for a specific product.
   * @param {string} productId - ID of the product.
   * @param {string} quantity - New quantity value.
   */
  const handleQuantityChange = (productId, quantity) => {
    const newQuantities = { ...orderQuantities };
    newQuantities[productId] = quantity === '' ? '' : parseInt(quantity);
  
    setOrderQuantities(newQuantities);
  
    const storageKey = `orderItem-${productId}`;
    const orderItemInStorage = JSON.parse(localStorage.getItem(storageKey));
    if (orderItemInStorage) {
      orderItemInStorage.quantity = newQuantities[productId];
      localStorage.setItem(storageKey, JSON.stringify(orderItemInStorage));
    }
  
    const total = orderItems.reduce((acc, item) => {
      const updatedQuantity = newQuantities[item.productId] || item.quantity;
      return acc + item.price * updatedQuantity;
    }, 0);
  
    setTotalOrder(total);
  };

  /**
   * Handles removal of a product from the order.
   * @param {string} productId - ID of the product to be removed.
   */
  const handleRemoveFromOrder = (productId) => {
    toast.info(
      <div className="confirmation-notification">
        ¿Estás seguro de que deseas eliminar este producto?
        <br />
        <div
          className='accept-button'
          onClick={() => {
            localStorage.removeItem(`orderItem-${productId}`);
            loadOrderItems();
            toast.dismiss();
            toast.success("Producto eliminado del pedido");
          }}>Aceptar
        </div>
        <div
          className='cancel-button'
          onClick={() => {
            toast.dismiss();
          }}>Cancelar
        </div>
      </div>,
      {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: false,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [isConfirmingOrder, setIsConfirmingOrder] = useState(false);
  
  /**
   * Handles confirmation of the order.
   */
  const handleConfirmOrder = async () => {
    if (!customerName) {
      toast.error("Por favor digite el nombre del cliente");
      return;
    }
  
    // Verifica si el pedido ya está siendo confirmado o ya ha sido confirmado
    if (isConfirmingOrder || isOrderConfirmed) {
      return;
    }
  
    setIsConfirmingOrder(true);
  
    const orderData = orderItems.map((item) => ({
      product: item.productId,
      quantity: orderQuantities[item.productId] || item.quantity,
      total: (orderQuantities[item.productId] || item.quantity) * item.price,
    }));
  
    const totalFinal = orderItems.reduce((acc, item) => {
      const updatedQuantity = orderQuantities[item.productId] || item.quantity;
      return acc + item.quantity * item.price;
    }, 0);
  
    const orderInfo = {
      customer: customerName,
      note: comments,
      total: totalFinal,
      order: orderData,
    };
  
    try {
      await axios.post(API_URL, orderInfo);
      Object.keys(localStorage)
        .filter((key) => key.startsWith("orderItem-"))
        .forEach((key) => localStorage.removeItem(key));
  
      loadOrderItems();
      toast.success("Pedido confirmado");
      navigate('/dashboard');
      setIsOrderConfirmed(true);
    } catch (error) {
      console.log(error);
    } finally {
      // Habilita el botón de confirmación después de un breve período de tiempo
      setTimeout(() => {
        setIsConfirmingOrder(false);
      }, 1000); // 1000 milisegundos = 1 segundo
    }
  };
  
  // En el renderizado, deshabilita el botón de confirmación si el pedido ya ha sido confirmado o está siendo confirmado
  <button
    className="order-confirm"
    onClick={handleConfirmOrder}
    disabled={isOrderConfirmed || isConfirmingOrder} // Deshabilita el botón si el pedido ya ha sido confirmado o está siendo confirmado
  >
    Confirmar Pedido
  </button>
    

  /**
   * Handles removal of all products from the order.
   */
  const handleRemoveAllFromOrder = () => {
    toast.info(
      <div className="confirmation-notification">
        ¿Estás seguro de que deseas eliminar todos los productos del pedido?
        <br />
        <div className="accept-button" onClick={() => {
          Object.keys(localStorage)
            .filter((key) => key.startsWith("orderItem-"))
            .forEach((key) => localStorage.removeItem(key));

          loadOrderItems();

          toast.dismiss();
          toast.success("Pedido Cancelado");
          navigate('/dashboard');
        }}>
          Sí
        </div>
        <div className="cancel-button" onClick={() => {
          toast.dismiss();
        }}>
          No
        </div>
      </div>,
      {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: false,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: false,
        closeButton: false,
      }
    );
  };
  
  useEffect(() => {
    const handleLocalStorageChange = (e) => {
      if (e.key.startsWith('orderItem-')) {
        loadOrderItems();
      }
    };

    window.addEventListener('storage', handleLocalStorageChange);

    loadOrderItems();

    return () => {
      window.removeEventListener('storage', handleLocalStorageChange);
    };
  }, []);

  return (
    <>
      <div className='product-detail-sales'>
        {orderItems.map((item) => (
          <div className="cardSalesOrder" key={item.productId}>
            <div className='containerOrder'>
              <div className='imageOrder'>
                <img src={item.image?.filePath} alt={item.image?.fileName} width={200} />
              </div>
              <div className='orderFields'>
                <p className="product_Name">{item.name}</p>
                <p className="product_ref">{item.sku}</p>
                <p className="product_price">${Number(item.price).toLocaleString('es-CO')} UND</p>
                <p className='product_price'>TOTAL: ${Number(item.price * (orderQuantities[item.productId] || item.quantity)).toLocaleString('es-CO')}</p>
              </div>
              <div className='inputOrder'>
                <input
                  type="number"
                  value={orderQuantities[item.productId] || ''}
                  onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                  className="input-quantity"
                  min='0'
                />
                <br />
              </div>
              <div className='buttonOrder'>
                  <FaRegTrashAlt size={30} onClick={() => handleRemoveFromOrder(item.productId)} color='#000000'/>
              </div>
            </div>
          </div>
        ))}
        
        <div className="sales-order-container">
        {orderItems.length > 0 && (
          <>
            <div className="customer-info">
              <label htmlFor="customer-name">Nombre del Cliente:</label>
              <input
                type="text"
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ingrese el nombre del cliente"
                required
              />
            </div>

            <div className="customer-info">
              <label htmlFor="comments">Comentarios:</label>
              <textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Añade comentarios adicionales aquí"
              />
            </div>
          </>
        )}
          
        {orderItems.length > 0 && (
          <div className="total-container">
            <span className="total-label">Total:</span>
            <span className="total-amount">${totalOrder.toLocaleString('es-CO')}</span>
          </div>
        )} 
        <div>
          {orderItems.length > 0 && (
            <button className="order-confirm" onClick={handleConfirmOrder}>
              Confirmar Pedido
            </button>
          )}
          {orderItems.length > 0 && (
            <button className="order-delete" onClick={handleRemoveAllFromOrder}>
              Cancelar Pedido
            </button>
          )}
        </div>        
      </div>
    </div>
  </>);
};

export default SalesOrder;
