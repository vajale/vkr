import { type ReducersMapObject } from "@reduxjs/toolkit";
import { type IAppThemeSchema } from "./slices/app/types";
import { type DocumentsPageSchema } from "./slices/pageSlice/types";
import { type PageSettingsSchema } from "./slices/pageSettingsSlice/types";
import { type IUserSchema } from "@/store/slices/userSlice/types";

import { pageReducer } from "./slices/pageSlice";
import { pageSettingsReducer } from "./slices/pageSettingsSlice";
import appReducer from "./slices/app/index";
import { userReducer } from "@/store/slices/userSlice";
import { firebaseDocumentsAPI } from "@/components/PageView/model/services/firebaseDocumentsAPI";
import { type ICalendarSchema } from "@/store/slices/calendarSlice/types";
import { calendarReducer } from "@/store/slices/calendarSlice";

export interface StateSchema {
   user: IUserSchema
   documentPage: DocumentsPageSchema;
   app: IAppThemeSchema;
   settings: PageSettingsSchema;
   calendar: ICalendarSchema
}

const rootReducer: ReducersMapObject<StateSchema> = {
   user: userReducer,
   documentPage: pageReducer,
   app: appReducer,
   settings: pageSettingsReducer,
   calendar: calendarReducer,
   // @ts-expect-error
   [firebaseDocumentsAPI.reducerPath]: firebaseDocumentsAPI.reducer
};

export default rootReducer;
