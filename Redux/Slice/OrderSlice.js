// src/redux/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getVendorId } from '../../utils/utils';

// AsyncThunk to fetch order data
export const fetchOrderData = createAsyncThunk(
  'order/fetchOrderData',
  async (orderId) => {
    const vendorId = await getVendorId()
    const response = await axios.get(`https://esdy.in/tachapis/vendor-api/get-orders.php?order_wise_items&vendor_id=${vendorId}&order_id=${orderId}`);  
    return response.data[0];
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderData.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  
});

export default orderSlice.reducer;
