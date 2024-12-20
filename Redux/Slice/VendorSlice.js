// vendorSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getVendorId } from '../../utils/utils';

// Async thunk for fetching vendor data
export const fetchVendorData = createAsyncThunk(
  'vendor/fetchVendorData',
  async (_, { rejectWithValue }) => {
    let vendorId = await getVendorId();
    try {
      const response = await axios.get(`http://tach21.in/tachapis/vendor-api/user-details.php?vendor_id=${vendorId}&get_vendor_details`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch vendor data');
    }
  }
);


const vendorSlice = createSlice({
  name: 'vendor',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchVendorData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vendorSlice.reducer;
