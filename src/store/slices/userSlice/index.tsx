import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User, type IUserSchema, type UserFirebase } from "@/store/slices/userSlice/types";
import { type Page } from "@/components/PageView/model/types";

const initialState: IUserSchema = {
    user: undefined,
    authData: undefined,
    _isInitialized: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        setFirebaseData: (state, action: PayloadAction<UserFirebase>) => {
            state.user = action.payload;
        },
        // Это чтобы при первом входе не директило нахуй с сайта, не надо в false кидатьы
        // Смотри если че AuthProvider
        initializeUser: (state) => {
            state._isInitialized = true;
        },
        logout: (state) => {
            state.authData = undefined;
            state.user = undefined;
        },
    },
    selectors: {
        selectUserAuth: (state) => state?.authData !== undefined,
        selectUser: (state) => state?.authData,
        selectUserData: (state) => state?.user,
        selectUserId: (state) => state.authData !== undefined ? state.authData.id : '',
        selectUsername: (state) => state.user !== undefined ? (state.user?.username ?? "") : '',
        selectUserPages: (state) => state.user !== undefined ? state.user.pages ?? [] : [],
        selectIsInitialized: (state) => state._isInitialized,
    },
});

export const { selectUserAuth, selectIsInitialized } = userSlice.selectors;
export const { selectUser, selectUserPages, selectUserData, selectUsername, selectUserId } = userSlice.selectors;
export default userSlice.reducer;

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
