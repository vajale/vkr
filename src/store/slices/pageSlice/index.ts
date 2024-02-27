import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type DocumentsPageSchema } from "./types";
import { mockDocs } from "../../../utils/mock/mockdata";
import {
   type DocumentBlock,
   type DocumentBlockType,
} from "../../../components/PageView/model/types";

const initialState: DocumentsPageSchema = {
   isLoading: false,
   error: undefined,
   data: mockDocs,
   formData: [],
   isPageEdit: false,
};

export const documentPageSlice = createSlice({
   name: "documentPage",
   initialState,
   reducers: (create) => ({
      // fetchDocuments: create.asyncThunk(
      //    async (userId: string, thunkAPi) => {
      //       const res = await fetch(userId);
      //       return (await res.json()) as DocumentBlock[];
      //    },
      //    {
      //       pending: (state) => {
      //          state.isLoading = true;
      //          state.error = undefined;
      //       },
      //       rejected: (state, action) => {
      //          state.error = "Error";
      //          state.isLoading = false;
      //       },
      //       fulfilled: (state, action: PayloadAction<DocumentBlock[]>) => {
      //          state.data = action.payload;
      //          state.formData = action.payload;
      //       }
      //    }
      // ),
      updateDocuments: create.reducer((state, action: PayloadAction<DocumentBlock[]>) => {
         state.data = action.payload;
      }),
      setPageEditState: create.reducer((state, action: PayloadAction<boolean>) => {
         state.isPageEdit = action.payload;
      }),
      updateDocumentType: create.reducer(
         (state, action: PayloadAction<{ id: string; type: DocumentBlockType }>) => {
            const { id, type } = action.payload;

            state.data.map((item) => {
               const block = item.id === id ? item : undefined;

               if (block != null) {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  block.type = type;
               }

               return item;
            });
         },
      ),
      updateDocumentBlock: create.reducer((state, action: PayloadAction<DocumentBlock>) => {
         state.data = state.data.map((item) => {
            const block = item.id === action.payload.id;

            if (block) {
               return {
                  ...item,
                  ...action.payload,
               };
            }

            return item;
         });
      }),
   }),
   selectors: {
      selectDocuments: (state) => state.data,
      selectDocumentsLoading: (state) => state.isLoading,
      selectDocumentsError: (state) => state.error,
      selectDocumentsIsEdit: (state) => state.isPageEdit,
   },
});

export const { actions: documentPageActions } = documentPageSlice;
export const { reducer: documentPageReducer } = documentPageSlice;
export const {
   selectDocuments,
   selectDocumentsLoading,
   selectDocumentsError,
   selectDocumentsIsEdit,
} = documentPageSlice.selectors;
