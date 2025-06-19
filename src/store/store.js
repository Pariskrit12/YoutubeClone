import { configureStore } from "@reduxjs/toolkit";
import likesReducer from "./slice/likeVideo.js";
import commentInterraction from "./slice/likeComment.js";
import { baseApi } from "../api/baseApi.js";
export const store = configureStore({
  reducer: {
    likes: likesReducer,
    myCommentState: commentInterraction,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
