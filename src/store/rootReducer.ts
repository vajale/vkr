import { type ReducersMapObject } from "@reduxjs/toolkit";
import appReducer from "./slices/app/index";
import { documentPageReducer } from "./slices/pageSlice";
import { type IAppThemeSchema } from "./slices/app/types";
import { type DocumentsPageSchema } from "./slices/pageSlice/types";

export interface StateSchema {
   documentPage: DocumentsPageSchema;
   app: IAppThemeSchema;
}

const rootReducer: ReducersMapObject<StateSchema> = {
   documentPage: documentPageReducer,
   app: appReducer,
};

export default rootReducer;
