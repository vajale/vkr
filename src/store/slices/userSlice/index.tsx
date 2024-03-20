import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {themePalette} from "@/enums/themePalette";
import {IUserSchema} from "@/store/slices/userSlice/types";
import {User} from "@/utils/types";

const initialState: IUserSchema = {

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
        selectUserAuth: (state) => state?.user || false,
        selectUser: (state) => state?.user || null
    }
});

export const {selectUserAuth} = userSlice.selectors
export const {selectUser} = userSlice.selectors
export default userSlice.reducer;

export const {actions: userActions} = userSlice;
export const {reducer: userReducer} = userSlice;
