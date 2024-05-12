import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type DocumentsPageSchema } from "./types";
import {
    type DocumentBlock,
    type DocumentBlockType,
    type Page
} from "@/components/PageView/model/types";
import { documentObjectHelper } from "@/utils/documentObjectHelper";
import { mockPage2 } from "@/utils/mock/mockdata";

const initialState: DocumentsPageSchema = {
    pageData: mockPage2,
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
        setPage: create.reducer((state, action: PayloadAction<Page>) => {
            state.pageData = action.payload;
        }),
        setEditDocumentId: create.reducer((state, action: PayloadAction<string>) => {
            state.editDocumentId = action.payload;
        }),
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
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
            const document = documentObjectHelper(type);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            state.pageData.documentBlocks = [...state.pageData.documentBlocks, document];
        }),
        removeDocumentBlock: create.reducer((state, action: PayloadAction<{ id: string }>) => {
            state.pageData.documentBlocks = state.pageData.documentBlocks.filter((item) => item.id !== action.payload.id);
        })
    }),
    selectors: {
        selectPage: (state) => state.pageData,
        selectPageIsEdit: (state) => state.isPageEdit,
        selectPageHeaderFlag: (state) => state.style.header,
        selectPageLogo: (state) => state.style.logo,
        selectEditDocumentId: (state) => state.editDocumentId
    }
});

export const { actions: documentPageActions } = documentPageSlice;
export const { reducer: documentPageReducer } = documentPageSlice;
export const {
selectPage, selectPageHeaderFlag, selectEditDocumentId
} = documentPageSlice.selectors;
