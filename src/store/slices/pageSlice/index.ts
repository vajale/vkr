import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type DocumentsPageSchema } from "./types";
import {
    type DocumentBlock,
    type DocumentBlockType,
    type Page,
} from "@/components/PageView/model/types";
import { documentObjectHelper } from "@/utils/documentObjectHelper";
import { insertElementBefore } from "@/utils";

const initialState: DocumentsPageSchema = {
    pageData: undefined,
    isPageEdit: false,
    style: {
        header: false,
        logo: "none",
    },
};

export const pageSlice = createSlice({
    name: "documentPage",
    initialState,
    reducers: (create) => ({
        setPage: create.reducer((state, action: PayloadAction<Page>) => {
            state.pageData = action.payload;
        }),
        setPageState: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isPageEdit = action.payload;
        }),
        setEditDocumentId: create.reducer((state, action: PayloadAction<string>) => {
            state.isPageEdit = action.payload;
        }),
        updateBlock: create.reducer((state, action: PayloadAction<DocumentBlock>) => {
            if (state.pageData === undefined) return;

            state.pageData.documentBlocks = state.pageData?.documentBlocks?.map((item) => {
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
        updateBlockType: create.reducer(
            (state, action: PayloadAction<{ id: string; type: DocumentBlockType }>) => {
                if (state.pageData === undefined) return;

                const { id, type } = action.payload;

                state.pageData.documentBlocks = state.pageData?.documentBlocks?.map((item) => {
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
        updateBlocks: create.reducer((state, action: PayloadAction<DocumentBlock[]>) => {
            if (state.pageData === undefined) return;

            state.pageData.documentBlocks = action.payload;
        }),
        duplicateBlock: create.reducer((state, action: PayloadAction<DocumentBlock>) => {
            if (state.pageData === undefined) return;
            const { id } = action.payload;

            if (state.pageData.documentBlocks) {
                // const index = state.pageData.documentBlocks.findIndex(obj => obj.id === id);
                //
                // if (index) {
                //     state.pageData.documentBlocks = insertElementBefore(state.pageData.documentBlocks, index, {
                //         ...action.payload,
                //         id: new Date().toJSON()
                //     });
                // } else {
                //     state.pageData.documentBlocks = [...state.pageData.documentBlocks, action.payload];
                // }

                state.pageData.documentBlocks = [...state.pageData.documentBlocks, action.payload];
            }
        }),
        updateHeader: create.reducer(
            (state, action: PayloadAction<typeof state.pageData.visual>) => {
                if (state.pageData === undefined) return;

                state.pageData.visual = {
                    ...state.pageData.visual,
                    ...action.payload,
                };
            },
        ),
        addNewBlock: create.reducer((state, action: PayloadAction<DocumentBlockType>) => {
            const type = action.payload;
            const document = documentObjectHelper(type);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            state.pageData.documentBlocks = [...state.pageData.documentBlocks, document];
        }),
        removeBlock: create.reducer((state, action: PayloadAction<{ id: string }>) => {
            if (state.pageData === undefined) return;

            state.pageData.documentBlocks = state.pageData?.documentBlocks?.filter(
                (item) => item.id !== action.payload.id,
            );
        }),
        updatePage: create.reducer((state, action: PayloadAction<Partial<Page>>) => {
            if (state.pageData === undefined) return;

            state.pageData = { ...state.pageData, ...action.payload };
        }),
        removePage: create.reducer((state, action) => {
            state.pageData = undefined;
        }),
    }),
    selectors: {
        selectPage: (state) => state.pageData,
        selectPageId: (state) => state.pageData !== undefined ? state.pageData.id : '',
        selectPageName: (state) => state.pageData?.visual?.name ?? "Страница",
        selectPageBackground: (state) => state.pageData?.visual?.background ?? "",
        selectPageDocuments: (state) => state.pageData?.documentBlocks ?? [],
        selectPageIsEdit: (state) => state.isPageEdit,
        selectPageHeaderFlag: (state) => state.style.header,
        selectPageLogo: (state) => state.style.logo,
    },
});

export const { actions: pageActions } = pageSlice;
export const { reducer: pageReducer } = pageSlice;
export const {
    selectPage,
    selectPageId,
    selectPageDocuments
} = pageSlice.selectors;
