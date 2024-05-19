import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { pagesService } from "@/api/firebasePageAPI/pagesService";

const store = configureStore({
    reducer: rootReducer,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pagesService.middleware),
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
