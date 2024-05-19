import React, { useEffect, useRef } from "react";

import PageHeader from "../PageHeader/PageHeader";
import { Paper } from "@mui/material";

import {
    useUpdatePageBlocksMutation,
    useUpdatePageVisualMutation,
} from "@/api/firebasePageAPI/pagesService";
import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import DocumentBlocksList from "@/components/PageView/ui/PageView/DocumentBlocksList";
import { type Page } from "../../model/types";
import { pageActions } from "@/store/slices/pageSlice";
import { useAppDispatch } from "@/store/hooks";

interface ViewProps {
    isLoading: boolean;
    page: Page;
    id: string;
}

const PageView = (props: ViewProps) => {
    const { isLoading, page } = props;

    const dispatch = useAppDispatch();

    const [updateDocuments] = useUpdatePageBlocksMutation();
    const [updateVisual] = useUpdatePageVisualMutation();

    useEffect(() => {
        if (!isLoading) {
            void updateVisual({ newPage: page });
        }
    }, [page]);

    useEffect(() => {
        if (!isLoading) {
            void updateDocuments({ newPage: page });
        }
    }, [page]);

    const handleHeaderChange = (content: string) => {
        dispatch(pageActions.updatePageHeader({ name: content }));
    };

    const headerText = page.visual?.name ?? 'Новая страница';
    const isHaveDocBlocks = page.documentBlocks !== undefined;

    return (
        <StyledPageView>
            <Paper
                className={"page-view-paper"}
                sx={{ width: 1200, height: 800, borderRadius: 3, ml: 7 }}>
                <PageHeader onContentChange={handleHeaderChange} text={headerText} background={page.visual?.background} />
                {isHaveDocBlocks && <DocumentBlocksList canEdit docs={page.documentBlocks}/>}
            </Paper>
        </StyledPageView>
    );
};

export default PageView;
