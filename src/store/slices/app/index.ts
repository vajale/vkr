import { IAppTypes } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import { themePalette } from "../../../enums/themePalette";

const initialState: IAppTypes = {
    colorMode: themePalette.Light,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setColorMode(state, action) {
            state.colorMode = action.payload;
        },
    },
});

export const { setColorMode } = appSlice.actions;

export default appSlice.reducer;
