import { configureStore } from "@reduxjs/toolkit";
import userIdSlice from "./userIdSlice";
import questionsSlice from "./questionsSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, PERSIST } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const reducer = combineReducers({
  userId: userIdSlice,
  questions: questionsSlice,
});
const persistedReducer = persistReducer(persistConfig, reducer);

// Middleware configuration
const middleware = (getDefaultMiddleware) => {
  return getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PERSIST],
    },
  });
};

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(store);
export default store;
