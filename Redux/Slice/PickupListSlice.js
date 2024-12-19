import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getVendorId } from "../../utils/utils";

export const fetchPickupList = createAsyncThunk(
  "pickupList/fetchPickupList",
  async (_, { rejectWithValue }) => {
    try {
      const vendorId = await getVendorId();
      const response = await axios.get(
        `https://tach21.com/tachapis/vendor-api/get-orders.php?ready_to_pick_orders&vendor_id=${vendorId}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("An error occurred while fetching accepted order details");
    }
  }
);

const PickupListSlice = createSlice({
  name: "pickupList",
  initialState: {
    loading: false,
    pickupList: [],
    error: "",
  },
  reducers: {
    resetList: (state) => {
        (state.pickupList = []), (state.error = "");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPickupList.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchPickupList.fulfilled, (state, action) => {
        state.loading = false;
        state.pickupList = action.payload;
        state.error = "";
      })
      .addCase(fetchPickupList.rejected, (state, action) => {
        state.loading = false;
        state.pickupList = [];
        state.error = action.payload;
      });
  },
});

export const { resetList } = PickupListSlice.actions;
export default PickupListSlice.reducer;
