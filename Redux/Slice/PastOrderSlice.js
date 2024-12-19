import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getVendorId } from "../../utils/utils";

export const fetchPastOrders = createAsyncThunk(
  "pastOrders/fetchPastOrders",
  async (filter, { rejectWithValue }) => {
    try {
      const vendorId = await getVendorId();
      const response = await axios.get(
        `https://tach21.com/tachapis/vendor-api/get-orders.php?get_order_list&vendor_id=${vendorId}&dateFilter=${filter?.dateFilter}&fromDate=${filter?.customRange?.startDate}&toDate=${filter?.customRange?.endDate}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("An error occurred while fetching past order details");
    }
  }
);

const pastOrderSlice = createSlice({
  name: "pastOrders",
  initialState: {
    loading: false,
    pastOrders: {},
    error: "",
  },
  reducers: {
    resetPastOrders: (state) => {
        (state.pastOrders = {}), (state.error = "");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPastOrders.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchPastOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.pastOrders = action.payload;
        state.error = "";
      })
      .addCase(fetchPastOrders.rejected, (state, action) => {
        state.loading = false;
        state.pastOrders = {};
        state.error = action.payload;
      });
  },
});

export const { resetPastOrders } = pastOrderSlice.actions;
export default pastOrderSlice.reducer;
