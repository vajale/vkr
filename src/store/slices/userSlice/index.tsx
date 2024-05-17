import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User, type IUserSchema } from "@/store/slices/userSlice/types";
import { type Page } from "@/components/PageView/model/types";

const initialState: IUserSchema = {
    user: undefined,
    _isInitialized: false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        initializeUser: (state) => {
            state.user = undefined;
        },
        logout: (state) => {
            state.user = undefined;
            state._isInitialized = false;
        },
        // removePage: (state, action: PayloadAction<string>) => {
        //     state.user.pages.map(page => page.id !== action.payload);
        // },
        updatePageName: (state, action: PayloadAction<Page>) => {
            // state.user.pages = state.user.pages.map((item) => {
            //     if(action.payload.id === item)
            //
            // })
        },
    },
    selectors: {
        selectUserAuth: (state) => state?.user !== undefined,
        selectUser: (state) => state?.user,
        selectUserPages: (state) => state.user?.pages,
    },
});

export const { selectUserAuth } = userSlice.selectors;
export const { selectUser, selectUserPages } = userSlice.selectors;
export default userSlice.reducer;

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
