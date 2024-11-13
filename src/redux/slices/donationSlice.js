import { createSlice } from '@reduxjs/toolkit';

const donationSlice = createSlice({
  name: 'donations',
  initialState: { list: [] },
  reducers: {
    setDonations(state, action) {
      state.list = action.payload;
    },
  },
});

export const { setDonations } = donationSlice.actions;
export default donationSlice.reducer;
