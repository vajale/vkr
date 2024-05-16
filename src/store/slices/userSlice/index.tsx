import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {User, type IUserSchema } from "@/store/slices/userSlice/types";

const initialState: IUserSchema = {
    user: undefined
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        initAuthData: (state) => {
            // const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            // if (user) {
            //     state.authData = JSON.parse(user);
            // }
        },
        logout: (state) => {
            state.user = undefined;
        },
    },
    selectors: {
        selectUserAuth: (state) => state?.user !== undefined,
        selectUser: (state) => state?.user,
        selectUserPages: (state) => state.user?.pages
    }
});

export const { selectUserAuth } = userSlice.selectors;
export const { selectUser, selectUserPages } = userSlice.selectors;
export default userSlice.reducer;

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
