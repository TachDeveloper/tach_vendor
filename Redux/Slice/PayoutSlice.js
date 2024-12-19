import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getVendorId } from "../../utils/utils";

export const fetchPayouts = createAsyncThunk(
  "Payouts/fetchPastOrders",
  async (filter, { rejectWithValue }) => {
    try {
      const vendorId = await getVendorId();
      const response = await axios.get(
        `https://tach21.com/tachapis/vendor-api/get-orders.php?vendor_insights&vendor_id=${vendorId}&dateFilter=${filter?.dateFilter}&fromDate=${filter?.customRange?.startDate}&toDate=${filter?.customRange?.endDate}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("An error occurred while fetching payouts");
    }
  }
);

const payoutSlice = createSlice({
  name: "Payouts",
  initialState: {
    loading: false,
    payouts: {},
    error: "",
  },
  reducers: {
    resetPayouts: (state) => {
        (state.payouts = []), (state.error = "");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayouts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchPayouts.fulfilled, (state, action) => {
        state.loading = false;
        state.payouts = action.payload;
        state.error = "";
      })
      .addCase(fetchPayouts.rejected, (state, action) => {
        state.loading = false;
        state.payouts = {};
        state.error = action.payload;
      });
  },
});

export const { resetPayouts } = payoutSlice.actions;
export default payoutSlice.reducer;
