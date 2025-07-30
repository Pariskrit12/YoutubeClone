import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./auth";
import { channelApi } from "../../api/channelApi";

const subSlice = createSlice({
  name: "sub",
  initialState: {
    subStatus: {},
    subCounts: {},
  },
  reducers: {
    subscribe: (state, action) => {
      const { channelId } = action.payload;
      if (!state.subCounts) {
        state.subCounts = {};
      }
       if (!state.subStatus) state.subStatus = {};
      if (!state.subCounts[channelId]) {
        //!undefined=true
        state.subCounts[channelId] = 1;
      } else {
        state.subCounts[channelId] += 1;
      }
      state.subStatus[channelId] = true;
    },
    unsubscribe: (state, action) => {
      const { channelId } = action.payload;
      if (!state.subCounts) {
        state.subCounts = {};
      }
      if (state.subCounts[channelId] && state.subCounts[channelId] > 0) {
        state.subCounts[channelId] -= 1;
      }
      state.subStatus[channelId] = false;
    },
    setSubscriptionState: (state, action) => {
      const { channelId, isSubscribed, subCount } = action.payload;
      state.subStatus[channelId] = isSubscribed;
      state.subCounts[channelId] = subCount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      (state.subCounts = {}), (state.subStatus = {});
    });
  },
});
export const { subscribe, unsubscribe,setSubscriptionState } = subSlice.actions;
export default subSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const subSlice = createSlice({
//   name: "sub",
//   initialState: {
//     subscription: {},
//     subCounts: {},
//   },
//   reducers: {
//     setSubscriptionStatus: (state, action) => {
//       const { channelId, isSubscribed } = action.payload;
//       state.subscription[channelId] = isSubscribed;
//     },
//     incrementSubCount: (state, action) => {
//       const { channelId } = action.payload;
//       if (!state.subCounts) {
//         state.subCounts = {};
//       }
//       if (!state.subCounts[channelId]) {
//         state.subCounts[channelId] = 1;
//       } else {
//         state.subCounts[channelId] += 1;
//       }
//     },
//     decrementSubCount: (state, action) => {
//       const { channelId } = action.payload;
//       if (!state.subCounts) {
//         state.subCounts = {};
//       }
//       if (state.subCounts[channelId] && state.subCounts[channelId] > 0) {
//         state.subCounts[channelId] -= 1;
//       }
//     },
//   },
// });
// export const { setSubscriptionStatus, decrementSubCount, incrementSubCount } =
//   subSlice.actions;
// export default subSlice.reducer;
