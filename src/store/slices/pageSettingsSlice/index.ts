import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type PageSettingsSchema } from "./types";

const initialState: PageSettingsSchema = {
   fontSettings: {
      fontStyle: "fontVariant",
      textSize: "default",
   },
   pageSettings: {
      fullWidth: false,
      isPageLocked: false,
   },
};

const pageSettingsSlice = createSlice({
   name: "settings",
   initialState,
   reducers: (create) => ({
      setFont: create.reducer(
         (state, action: PayloadAction<{ fontStyle: string; text: "small" | "default" }>) => {
            state.fontSettings = {
               ...state.fontSettings,
               ...action.payload,
            };
         },
      ),
      setPageSettings: create.reducer(
         (
            state,
            action: PayloadAction<{
               fullWidth: boolean;
               isPageLocked: boolean;
            }>,
         ) => {
            state.pageSettings = {
               ...state.pageSettings,
               ...action.payload,
            };
         },
      ),
   }),
   selectors: {
      selectFontStyle: (state) => state.fontSettings.fontStyle,
      selectTextSize: (state) => state.fontSettings.textSize,
      selectFullWithFlag: (state) => state.pageSettings.fullWidth,
      selectPageLockedFlag: (state) => state.pageSettings.isPageLocked,
   },
});

export const { actions: pageSettingsAction } = pageSettingsSlice;
export const { reducer: pageSettingsReducer } = pageSettingsSlice;

export const { selectFontStyle, selectTextSize, selectPageLockedFlag, selectFullWithFlag } =
   pageSettingsSlice.selectors;
