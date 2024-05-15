import React, { useEffect } from "react";

import PageHeader from "../PageHeader/PageHeader";
import { Paper } from "@mui/material";

import {
    selectPage, selectPageBackground,
    selectPageHeaderFlag, selectPageName
} from "@/store/slices/pageSlice";

import { useAppSelector } from "@/store/hooks";

import {
    useUpdatePageBlocksMutation,
    useUpdatePageVisualMutation
} from "@/components/PageView/model/services/firebaseDocumentsAPI";
import { selectUser } from "@/store/slices/userSlice";
import { type Page } from "../../model/types";
import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import DocumentBlocksList from "@/components/PageView/ui/PageView/DocumentBlocksList";

interface ViewProps {
    page?: Page
}

const PageView = () => {
    const [updateDocuments] = useUpdatePageBlocksMutation();
    const [updateVisual] = useUpdatePageVisualMutation();

    const page = useAppSelector(selectPage);
    const background = useAppSelector(selectPageBackground);
    const name = useAppSelector(selectPageName);

    useEffect(() => {
        void updateVisual({ newPage: page });
    }, [name]);

    useEffect(() => {
        void updateDocuments({ newPage: page });
    }, [page]);

    // const handleDocumentChange = () => {
    //     // void updateDocuments({ newPage: page });
    // };
    // const handleHeaderChange = () => {
    //     // void updateVisual({ newPage: page });
    // };

    if (page.documentBlocks === undefined) {
        console.log('no blocks');
        return (
            <StyledPageView>
                <Paper className={"page-view-paper"} sx={{ width: 1200, height: 800, borderRadius: 3, ml: 7 }}>
                    <PageHeader text={name}/>
                </Paper>
            </StyledPageView>
        );
    }

    return (
        <StyledPageView>
            <Paper className={"page-view-paper"} sx={{ width: 1200, height: 800, borderRadius: 3, ml: 7 }}>
                <PageHeader text={name} background={background}/>
                  <DocumentBlocksList
                    canEdit
                    docs={page.documentBlocks}/>
            </Paper>
        </StyledPageView>
    );
};

export default PageView;
