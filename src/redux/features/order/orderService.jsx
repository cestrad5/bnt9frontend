import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND;
const API_URL = `${BACKEND_URL}/api/orders/order`; 


const createOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData);
    return response.data;
    
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};


const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
  
};


const deleteOrder = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};


const getOrder = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};


const updateOrder = async (id, orderData) => {
  const response = await axios.patch(`${API_URL}${id}`, orderData);
  return response.data;
};

const orderService = {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
};

export default orderService;
