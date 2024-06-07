import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { pagesEndpoins } from "@/api/firebasePageAPI/pagesEndpoins";

const store = configureStore({
    reducer: rootReducer,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(pagesEndpoins.middleware)
});

export const dispatch = store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
