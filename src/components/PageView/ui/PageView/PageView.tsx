import React, { memo, useEffect, useState } from "react";

import PageHeader from "../PageHeader/PageHeader";
import { Paper, Stack } from "@mui/material";

import {
    selectPage,
    selectPageHeaderFlag
} from "@/store/slices/pageSlice";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
    useFetchPageDataQuery,
    useUpdatePageMutation
} from "@/components/PageView/model/services/firebaseDocumentsAPI";
import { selectUser } from "@/store/slices/userSlice";
import { DocumentBlockType, type Page } from "../../model/types";
import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import DocumentBlocksList from "@/components/PageView/ui/PageView/DocumentBlocksList";

interface ViewProps {
    data: Page,
}

const PageView = memo(() => {
    const isHaveHeader = useAppSelector(selectPageHeaderFlag);

    const page = useAppSelector(selectPage);
    const user = useAppSelector(selectUser);

    const [updateRandomPage] = useUpdatePageMutation();

    return (
        <StyledPageView>
            <Paper className={"page-view-paper"} sx={{ 	width: 1200, height: 800, borderRadius: 3, ml: 3 }}>
                <PageHeader text={"Header"} hover={isHaveHeader}/>
                <DocumentBlocksList
                    canEdit
                    onDocumentsChanges={() => updateRandomPage}
                    docs={page.documentBlocks}
                />
            </Paper>
        </StyledPageView>
    );
});

export default PageView;
