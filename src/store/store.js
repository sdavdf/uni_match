// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authReducer from "./authSlice";
import { alojamientoApi } from "./alojamiento/alojamientoApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [alojamientoApi.reducerPath]: alojamientoApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(alojamientoApi.middleware)
});
