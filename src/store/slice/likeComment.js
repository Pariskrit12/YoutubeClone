import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./auth";
const commentInterractionSlice = createSlice({
  name: "commentInteraction",
  initialState: {
    likedComment: {},
    dislikedComment: {},
    likedCount: {},
    dislikedCount: {},
  },
  reducers: {
    likeComment: (state, action) => {
      const commentId = action.payload;
      const isLiked = !!state.likedComment[commentId];

      if (isLiked) {
        delete state.likedComment[commentId];
        state.likedCount[commentId] = (state.likedCount[commentId] || 1) - 1;
      } else {
        state.likedComment[commentId] = true;
        state.likedCount[commentId] = (state.likedCount[commentId] || 0) + 1;
        if (state.dislikedComment[commentId]) {
          delete state.dislikedComment[commentId];
          state.dislikedCount[commentId] =
            (state.dislikedCount[commentId] || 1) - 1;
        }
      }
    },
    dislikeComment: (state, action) => {
      const commentId = action.payload;
      const isDisliked = !!state.dislikedComment[commentId];

      if (isDisliked) {
        delete state.dislikedComment[commentId];
        state.dislikedCount[commentId] =
          (state.dislikedCount[commentId] || 1) - 1;
      } else {
        state.dislikedComment[commentId] = true;
        state.dislikedCount[commentId] =
          (state.dislikedCount[commentId] || 0) + 1;
        if (state.likedComment[commentId]) {
          delete state.likedComment[commentId];
          state.likedCount[commentId] = (state.likedCount[commentId] || 1) - 1;
        }
      }
    },
    setCommentInteractionState: (state, action) => {
      const { commentId, isLiked, isDisliked, likeCount, dislikeCount } =
        action.payload;
      (state.dislikedCount[commentId] = dislikeCount),
        (state.likedCount[commentId] = likeCount),
        (state.likedComment[commentId] = isLiked),
        (state.dislikedComment[commentId] = isDisliked);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      (state.likedComment = {}),
        (state.dislikedComment = {}),
        (state.likedCount = {}),
        (state.dislikedCount = {});
    });
  },
});

export const { likeComment, dislikeComment, setCommentInteractionState } =
  commentInterractionSlice.actions;
export default commentInterractionSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// ;

// export const likeComment = createAsyncThunk(
//   "commentInterraction/likeComment",
//   async (commentId, thunkAPI) => {
//     await axios.post(
//       `/api/v1/likes/like-comment/${commentId}`,
//       {},
//       { withCredentials: true }
//     );
//     return { commentId };
//   }
// );

// export const dislikeComment = createAsyncThunk(
//   "commentInterraction/dislikeComment",
//   async (commentId, thunkAPI) => {
//     await axios.post(
//       `/api/v1/likes/dislike-comment/${commentId}`,
//       {},
//       { withCredentials: true }
//     );
//     return { commentId };
//   }
// );

// const commentInterractionSlice = createSlice({
//   name: "commentInterraction",
//   initialState: {
//     likedComments: {},
//     dislikedComments: {},
//     likeCounts: {},
//     dislikeCounts: {},
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.
//     addCase(likeComment.fulfilled, (state, action) => {
//       const cId = action.payload.commentId;
//       const isLiked = !!state.likedComments[cId];

//       if (isLiked) {
//         delete state.likedComments[cId];
//         state.likeCounts[cId] = (state.likeCounts[cId] || 1) - 1;
//       } else {
//         state.likedComments[cId] = true;
//         state.likeCounts[cId] = (state.likeCounts[cId] || 0) + 1;
//         if (state.dislikedComments[cId]) {
//           delete state.dislikedComments[cId];
//           state.dislikeCounts[cId] = (state.dislikeCounts[cId] || 1) - 1;
//         }
//       }
//     })
//     .addCase(dislikeComment.fulfilled,(state,action)=>{
//         const cId=action.payload.commentId;
//         const isDisliked=!!state.dislikedComments[cId];
//         if(isDisliked){
//             delete state.dislikedComments[cId];
//             state.dislikeCounts[cId]=(state.dislikeCounts[cId]||1)-1
//         }
//         else{
//             state.dislikedComments[cId]=true;
//             state.dislikeCounts[cId]=(state.dislikeCounts[cId]||0)+1
//             if(state.likedComments[cId]){
//                 delete state.likedComments[cId];
//                 state.likeCounts[cId]=(state.likeCounts[cId]||1)-1
//             }
//         }
//     });
//   },

// });
// export default commentInterractionSlice.reducer;
