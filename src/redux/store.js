// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../redux/features/auth/authSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../redux/features/auth/authSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);
// const persistedDocReducer = persistReducer(persistConfig, docReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    doc: persistedReducer,
  },
});

export const persistor = persistStore(store);
