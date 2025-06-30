import { createSlice } from "@reduxjs/toolkit";

const subSlice = createSlice({
  name: "sub",
  initialState: {
    subscription: {},
    subCounts: {},
  },
  reducers: {
    setSubscriptionStatus: (state, action) => {
      const { channelId, isSubscribed } = action.payload;
      state.subscription[channelId] = isSubscribed;
    },
    incrementSubCount: (state, action) => {
      const { channelId } = action.payload;
      if (!state.subCounts) {
        state.subCounts = {};
      }
      if (!state.subCounts[channelId]) {
        state.subCounts[channelId] = 1;
      } else {
        state.subCounts[channelId] += 1;
      }
    },
    decrementSubCount: (state, action) => {
      const { channelId } = action.payload;
      if (!state.subCounts) {
        state.subCounts = {};
      }
      if (state.subCounts[channelId] && state.subCounts[channelId] > 0) {
        state.subCounts[channelId] -= 1;
      }
    },
  },
});
export const { setSubscriptionStatus, decrementSubCount, incrementSubCount } =
  subSlice.actions;
export default subSlice.reducer;
