import React, { useEffect } from "react";

import PageHeader from "../PageHeader/PageHeader";
import { Paper } from "@mui/material";
import { isEqual } from 'lodash';

import {
    pageActions,
    selectPage, selectPageBackground,
    selectPageName
} from "@/store/slices/pageSlice";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
    useUpdatePageBlocksMutation,
    useUpdatePageVisualMutation
} from "@/components/PageView/model/services/firebaseDocumentsAPI";
import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import DocumentBlocksList from "@/components/PageView/ui/PageView/DocumentBlocksList";
import { child, ref, onValue } from "firebase/database";
import { firebaseDatabase } from "@/components/FireBase";

interface ViewProps {
    isLoading: boolean
}

const PageView = (props: ViewProps) => {
    const { isLoading } = props;

    const dispatch = useAppDispatch();

    const [updateDocuments] = useUpdatePageBlocksMutation();
    const [updateVisual] = useUpdatePageVisualMutation();

    const page = useAppSelector(selectPage);
    const background = useAppSelector(selectPageBackground);
    const name = useAppSelector(selectPageName);

    useEffect(() => {
        if (page !== undefined) {
            const dbRef = ref(firebaseDatabase);
            const specificNodeRef = child(dbRef, page.id);
            const sp = child(specificNodeRef, 'page');

            onValue(sp, snapshot => {
                if (isEqual(page, snapshot.val()) === false) {
                    dispatch(pageActions.updatePage(snapshot.val()));
                }
            }, {
                onlyOnce: true
            });
        }
    }, [page]);

    useEffect(() => {
        if (!isLoading) {
            void updateVisual({ newPage: page });
        }
    }, [name]);

    useEffect(() => {
        if (!isLoading) {
            void updateDocuments({ newPage: page });
        }
    }, [page]);

    if (page.documentBlocks === undefined) {
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
