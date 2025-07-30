import { configureStore } from "@reduxjs/toolkit";
import commentInterractionReducer from "../store/slice/likeComment.js";
import { baseApi } from "../api/baseApi.js";
import subReducer from "../store/slice/toggleSubscription.js";
import authReducer from "../store/slice/auth.js";
import { combineReducers } from "redux";
import videoInteractionReducer from "../store/slice/likeVideo.js";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["sub", "auth", "videoInteraction", "commentInterraction"], // state slices you want to persist
};

const rootReducer = combineReducers({
  commentInterraction: commentInterractionReducer,
  videoInteraction: videoInteractionReducer,

  [baseApi.reducerPath]: baseApi.reducer,
  sub: subReducer,
  auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});
export const persistor = persistStore(store);
