import {type IAppThemeSchema} from "./types";
import {createSlice} from "@reduxjs/toolkit";
import {themePalette} from "@/enums/themePalette";

const initialState: IAppThemeSchema = {
    colorMode: themePalette.Light,
};

export const appThemeSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setColorMode(state, action) {
            state.colorMode = action.payload;
        },
    },
});

export const {setColorMode} = appThemeSlice.actions;
export default appThemeSlice.reducer;

export const {actions: appThemeActions} = appThemeSlice;
export const {reducer: appThemeReducer} = appThemeSlice;
