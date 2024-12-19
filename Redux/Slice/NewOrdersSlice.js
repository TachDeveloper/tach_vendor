import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getVendorId } from "../../utils/utils";

export const fetchNewOrders = createAsyncThunk(
  "newOrders/fetchNewOrders",
  async (_, { rejectWithValue }) => {
    try {
      const vendorId = await getVendorId();
      const response = await axios.get(
        `https://esdy.in/tachapis/vendor-api/get-orders.php?vendor_id=${vendorId}&new_orders_with_items`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("An error occurred while fetching accepted order details");
    }
  }
);

const newOrderSlice = createSlice({
  name: "newOrders",
  initialState: {
    loading: false,
    newOrders: [],
    error: "",
  },
  reducers: {
    resetOrders: (state) => {
        (state.newOrders = []), (state.error = "");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewOrders.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchNewOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.newOrders = action.payload;
        state.error = "";
      })
      .addCase(fetchNewOrders.rejected, (state, action) => {
        state.loading = false;
        state.newOrders = [];
        state.error = action.payload;
      });
  },
});

export const { resetOrders } = newOrderSlice.actions;
export default newOrderSlice.reducer;
