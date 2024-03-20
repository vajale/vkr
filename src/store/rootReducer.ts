import { type ReducersMapObject } from "@reduxjs/toolkit";
import { type IAppThemeSchema } from "./slices/app/types";
import { type DocumentsPageSchema } from "./slices/pageSlice/types";
import { type PageSettingsSchema } from "./slices/pageSettingsSlice/types";

import { documentPageReducer } from "./slices/pageSlice";
import { pageSettingsReducer } from "./slices/pageSettingsSlice";
import appReducer from "./slices/app/index";

export interface StateSchema {
   documentPage: DocumentsPageSchema;
   app: IAppThemeSchema;
   settings: PageSettingsSchema;
}

const rootReducer: ReducersMapObject<StateSchema> = {
   documentPage: documentPageReducer,
   app: appReducer,
   settings: pageSettingsReducer,
};

export default rootReducer;
