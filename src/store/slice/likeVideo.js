import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./auth";
import { videoApi } from "../../api/videoApi";
const videoInteractionSlice = createSlice({
  name: "videoInteraction",
  initialState: {
    likeCounts: {},
    dislikeCounts: {},
    likedVideo: {}, //[videoId:true]
    dislikedVideo: {},
  },
  reducers: {
    like: (state, action) => {
      const videoId = action.payload;
      const isLiked = !!state.likedVideo[videoId];
      if (isLiked) {
        delete state.likedVideo[videoId];
        state.likeCounts[videoId] = (state.likeCounts[videoId] || 1) - 1;
      } else {
        state.likedVideo[videoId] = true;
        state.likeCounts[videoId] = (state.likeCounts[videoId] || 0) + 1;
        if (state.dislikedVideo[videoId]) {
          delete state.dislikedVideo[videoId];
          state.dislikeCounts[videoId] =
            (state.dislikeCounts[videoId] || 1) - 1;
        }
      }
    },
    dislike: (state, action) => {
      const videoId = action.payload;
      const isDisliked = !!state.dislikedVideo[videoId];
      if (isDisliked) {
        delete state.dislikedVideo[videoId];
        state.dislikeCounts[videoId] = (state.dislikeCounts[videoId] || 1) - 1;
      } else {
        state.dislikedVideo[videoId] = true;
        state.dislikeCounts[videoId] = (state.dislikeCounts[videoId] || 0) + 1;
        if (state.likedVideo[videoId]) {
          delete state.likedVideo[videoId];
          state.likeCounts[videoId] = (state.likeCounts[videoId] || 1) - 1;
        }
      }
    },
    //actual state after backend response
    setInteractionState: (state, action) => {
      const { videoId, isLiked, isDisliked, dislikeCount, likeCount } =
        action.payload;
      (state.likedVideo[videoId] = isLiked),
        (state.dislikedVideo[videoId] = isDisliked),
        (state.dislikeCounts[videoId] = dislikeCount),
        (state.likeCounts[videoId] = likeCount);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      (state.likedVideo = {}),
        (state.dislikedVideo = {}),
        (state.likeCounts = {}),
        (state.dislikeCounts = {});
    });
  },
});

export const { like, dislike, setInteractionState } =
  videoInteractionSlice.actions;
export default videoInteractionSlice.reducer;
