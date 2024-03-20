import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type DocumentsPageSchema } from "./types";
import { mockPage1 } from "../../../utils/mock/mockdata";
import {
   type DocumentBlock,
   DocumentBlockType,
   type DocumentCheckboxBlock,
   type DocumentCodeBlock, type DocumentPageLinkBlock,
   type DocumentTextBlock
} from "../../../components/PageView/model/types";

const initialState: DocumentsPageSchema = {
   isLoading: false,
   error: undefined,
   pageData: mockPage1,
   formData: [],
   isPageEdit: false,
   style: {
      header: false,
      logo: "none"
   }
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
         state.pageData.documentBlocks = action.payload;
      }),
      setPageEditState: create.reducer((state, action: PayloadAction<boolean>) => {
         state.isPageEdit = action.payload;
      }),
      updateDocumentType: create.reducer(
         (state, action: PayloadAction<{ id: string; type: DocumentBlockType }>) => {
            const { id, type } = action.payload;

            state.pageData.documentBlocks = state.pageData.documentBlocks.map((item) => {
               const block = item.id === id ? item : undefined;

               if (block != null) {
                  // @ts-expect-error
                  block.type = type;
               }

               return item;
            });
         }
      ),
      updateDocumentBlock: create.reducer((state, action: PayloadAction<DocumentBlock>) => {
         state.pageData.documentBlocks = state.pageData.documentBlocks.map((item) => {
            const block = item.id === action.payload.id;

            if (block) {
               return {
                  ...item,
                  ...action.payload
               };
            }
            return item;
         });
      }),
      addDocumentBlock: create.reducer((state, action: PayloadAction<DocumentBlockType>) => {
         const type = action.payload;
         const id = new Date().toJSON();
         const defaultContent = "";

         if (type === DocumentBlockType.TEXT) {
            const newblock: DocumentTextBlock = {
               id,
               type,
               content: defaultContent
            };

            state.pageData.documentBlocks = [...state.pageData.documentBlocks, newblock];
            return;
         }
         if (type === DocumentBlockType.CHECKBOX) {
            const newblock: DocumentCheckboxBlock = {
               id,
               type,
               content: defaultContent,
               flag: false
            };

            state.pageData.documentBlocks = [...state.pageData.documentBlocks, newblock];
            return;
         }

         if (type === DocumentBlockType.LINK) {
            const newblock: DocumentPageLinkBlock = {
               id,
               type,
               src: '/',
               content: "Page_link"
            };

            state.pageData.documentBlocks = [...state.pageData.documentBlocks, newblock];
            return;
         }

         if (type === DocumentBlockType.CODE) {
            const newblock: DocumentCodeBlock = {
               id,
               type,
               content: defaultContent
            };

            state.pageData.documentBlocks = [...state.pageData.documentBlocks, newblock];
         }
      }),
      removeDocumentBlock: create.reducer((state, action: PayloadAction<{ id: string }>) => {
         state.pageData.documentBlocks = state.pageData.documentBlocks.filter((item) => item.id !== action.payload.id);
      })
   }),
   selectors: {
      selectDocuments: (state) => state.pageData.documentBlocks,
      selectDocumentsLoading: (state) => state.isLoading,
      selectDocumentsError: (state) => state.error,
      selectDocumentsIsEdit: (state) => state.isPageEdit,
      selectDocumentHeaderFlag: (state) => state.style.header,
      selectDocumentLogo: (state) => state.style.logo
   }
});

export const { actions: documentPageActions } = documentPageSlice;
export const { reducer: documentPageReducer } = documentPageSlice;
export const {
   selectDocuments,
   selectDocumentsLoading,
   selectDocumentsError,
   selectDocumentsIsEdit,
   selectDocumentHeaderFlag,
   selectDocumentLogo
} = documentPageSlice.selectors;
