import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { documentsApi } from "../components/PageView/model/services/getDocumentsData";

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
   devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
