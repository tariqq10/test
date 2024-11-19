import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchApprovedDonations = createAsyncThunk(
  "donations/fetchApprovedDonations",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/approved-donations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data.approved_donations;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const donationSlice = createSlice({
  name: "donations",
  initialState: {
    approvedDonations: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchApprovedDonations.pending, (state) => {
      state.status = "loading"
    })
    .addCase(fetchApprovedDonations.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.approvedDonations = action.payload;
    })
    .addCase(fetchApprovedDonations.rejected, (state,action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  }
});

export default donationSlice.reducer;