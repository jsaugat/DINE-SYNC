import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/api/apiSlice";
import selectionReducer from "./slices/reservation/selectionSlice";
import totalTablesReducer from "./slices/reservation/totalTablesSlice";
import bookingDetailsReducer from "./slices/reservation/bookingDetailsSlice";
import ordersReducer from "./slices/reservation/ordersSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    bookingDetails: bookingDetailsReducer,
    totalTables: totalTablesReducer,
    selection: selectionReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // uses the default middleware provided by Redux Toolkit for store.
  devTools: true, // Enables the use of Redux DevTools Extension.
});

export default store;
