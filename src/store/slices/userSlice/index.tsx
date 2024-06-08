import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    type IUserSchema,
    SIGN_STATS,
    type User,
    type UserFirebase,
} from "@/store/slices/userSlice/types";

const initialState: IUserSchema = {
    user: undefined,
    authData: undefined,
    _isInitialized: false,
    signStatus: SIGN_STATS.pending,
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
        setSignStatus: (state, action: PayloadAction<SIGN_STATS>) => {
            state.signStatus = action.payload;
        },
    },
    selectors: {
        selectUserAuth: (state) => state?.authData !== undefined,
        selectUser: (state) => state?.authData,
        selectUserData: (state) => state?.user,
        selectUserId: (state) => (state.authData !== undefined ? state.authData.id : ""),
        selectUsername: (state) => (state.user !== undefined ? state.user?.username ?? "" : ""),
        selectUserPages: (state) => (state.user !== undefined ? state.user.pages ?? [] : []),
        selectUserFavorites: (state) => (state.user !== undefined ? state.user.favorites ?? [] : []),
        selectIsInitialized: (state) => state._isInitialized,
        selectSignStatus: (state) => state.signStatus,
        selectAvatar: (state) => (state.authData?.avatar) ?? '',
    },
});

export const { selectUserAuth, selectIsInitialized, selectSignStatus } = userSlice.selectors;
export const { selectUser, selectUserPages, selectUserData, selectUsername, selectUserId, selectUserFavorites, selectAvatar } =
    userSlice.selectors;
export default userSlice.reducer;

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
