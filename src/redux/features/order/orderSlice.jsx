import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
  orders: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Define las acciones de Redux para las órdenes (similar a lo que tienes en el slice de productos)

// Acción para obtener todas las órdenes
export const getOrders = createAsyncThunk("orders/getAll", async (_, thunkAPI) => {
  try {
    return await orderService.getOrders();
  } catch (error) {
    const message = error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Otras acciones para crear, actualizar o eliminar órdenes si es necesario.

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default orderSlice.reducer;
