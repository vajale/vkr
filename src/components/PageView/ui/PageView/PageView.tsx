import React, { useEffect, useRef } from "react";

import PageHeader from "../PageHeader/PageHeader";
import { Paper } from "@mui/material";

import {
    useUpdatePageBlocksMutation,
    useUpdatePageVisualMutation,
} from "@/components/PageView/model/services/firebaseDocumentsAPI";
import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import DocumentBlocksList from "@/components/PageView/ui/PageView/DocumentBlocksList";
import { type Page } from "../../model/types";

interface ViewProps {
    isLoading: boolean;
    page: Page;
    id: string;
}

const PageView = (props: ViewProps) => {
    const { isLoading, page } = props;

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

    if (page.documentBlocks === undefined) {
        return (
            <StyledPageView>
                <Paper
                    className={"page-view-paper"}
                    sx={{ width: 1200, height: 800, borderRadius: 3, ml: 7 }}>
                    <PageHeader text={page.visual?.name} />
                </Paper>
            </StyledPageView>
        );
    }

    return (
        <StyledPageView>
            <Paper
                className={"page-view-paper"}
                sx={{ width: 1200, height: 800, borderRadius: 3, ml: 7 }}>
                <PageHeader text={page.visual?.name} background={page.visual?.background} />
                <DocumentBlocksList canEdit docs={page.documentBlocks} />
            </Paper>
        </StyledPageView>
    );
};

export default PageView;
