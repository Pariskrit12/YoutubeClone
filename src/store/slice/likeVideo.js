import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

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
  },
});

export const { like,dislike } = videoInteractionSlice.actions;
export default videoInteractionSlice.reducer;




// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const likeVideo = createAsyncThunk(
//   "likes/likeVideo",
//   async (videoId, thunkAPI) => {
//     await axios.post(
//       `/api/v1/likes/like-video/${videoId}`,
//       {},
//       { withCredentials: true }
//     );
//     return { videoId };
//   }
// );

// export const dislikeVideo = createAsyncThunk(
//   "likes/dislikeVideo",
//   async (videoId, thunkAPI) => {
//     await axios.post(
//       `/api/v1/likes/dislike-video/${videoId}`,
//       {},
//       { withCredentials: true }
//     );
//     return { videoId };
//   }
// );

// const likeSlice = createSlice({
//   name: "likes",
//   initialState: {
//     likeCounts: {}, //{[videoid]:count}
//     dislikeCounts: {},
//     likedVideos: {}, // { [videoId]: true }
//     dislikedVideos: {},
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(likeVideo.fulfilled, (state, action) => {
//         const vid = action.payload.videoId;
//         const isLiked = !!state.likedVideos[vid];

//         if (isLiked) {
//           delete state.likedVideos[vid];
//           state.likeCounts[vid] = (state.likeCounts[vid] || 1) - 1;
//         } else {
//           state.likedVideos[vid] = true;
//           state.likeCounts[vid] = (state.likeCounts[vid] || 0) + 1;
//           if (state.dislikedVideos[vid]) {
//             delete state.dislikedVideos[vid];
//             state.dislikeCounts[vid] = (state.dislikeCounts[vid] || 1) - 1;
//           }
//         }
//       })
//       .addCase(dislikeVideo.fulfilled, (state, action) => {
//         const vid = action.payload.videoId;
//         const isDisliked = !!state.dislikedVideos[vid];

//         if (isDisliked) {
//           delete state.dislikedVideos[vid];
//           state.dislikeCounts[vid] = (state.dislikeCounts[vid] || 1) - 1;
//         } else {
//           state.dislikedVideos[vid] = true;
//           state.dislikeCounts[vid] = (state.dislikeCounts[vid] || 0) + 1;
//           if (state.likedVideos[vid]) {
//             delete state.likedVideos[vid];
//             state.likeCounts[vid] = (state.likeCounts[vid] || 1) - 1;
//           }
//         }
//       });
//   },
// });

// export default likeSlice.reducer;
