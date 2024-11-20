import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  donationRequests: [],
  donations: [],
  approvedDonations: [],
  donationHistory: [],
  status: "idle",
  error: null,
};


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
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const fetchDonations = createAsyncThunk('donations/fetchDonations',async (thunkApi) => {
  try{
    const response = await axios.get('/api/donations/history', {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    })
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data)
  }
})
const donationSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {
    setDonationRequests: (state, action) => {
      state.donationRequests = action.payload
    },
    setDonations: (state, action) => {
      state.donations =action.payload
    },
    
  },
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
    })

    .addCase(fetchDonations.pending, (state) => {
      state.status = "loading";
    })

    .addCase(fetchDonations.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.donationHistory = action.payload
    })

    .addCase(fetchDonations.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
  }
});

export const {setDonationRequests, setDonations} = donationSlice.actions

export default donationSlice.reducer;