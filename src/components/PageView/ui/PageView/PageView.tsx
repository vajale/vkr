import React, { useEffect, useRef } from "react";

import PageHeader from "../PageHeader/PageHeader";
import { Paper } from "@mui/material";
import { isEqual } from "lodash";

import { pageActions, selectPageBackground, selectPageName } from "@/store/slices/pageSlice";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
    useUpdatePageBlocksMutation,
    useUpdatePageVisualMutation,
} from "@/components/PageView/model/services/firebaseDocumentsAPI";
import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import DocumentBlocksList from "@/components/PageView/ui/PageView/DocumentBlocksList";
import { child, ref, onValue, off } from "firebase/database";
import { firebaseDatabase } from "@/components/FireBase";
import { type Page } from "../../model/types";
import { userActions } from "@/store/slices/userSlice";

interface ViewProps {
    isLoading: boolean;
    page: Page;
    id: string;
}

const PageView = (props: ViewProps) => {
    const { isLoading, page, id } = props;

    const dispatch = useAppDispatch();

    const idRef = useRef<string>();

    const [updateDocuments] = useUpdatePageBlocksMutation();
    const [updateVisual] = useUpdatePageVisualMutation();

    const background = useAppSelector(selectPageBackground);
    const name = useAppSelector(selectPageName);

    useEffect(() => {
        if (id == idRef.current) {
            return;
        }

        const dbRef = ref(firebaseDatabase);
        const specificNodeRef = child(dbRef, id);
        const sp = child(specificNodeRef, "page");

        onValue(
            sp,
            (snapshot) => {
                if (!isEqual(page, snapshot.val())) {
                    dispatch(pageActions.updatePage(snapshot.val()));
                }
            },
            {
                onlyOnce: true,
            },
        );

        idRef.current = id;

        return () => {
            off(sp);
        };
    }, [id]);

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
                <Paper
                    className={"page-view-paper"}
                    sx={{ width: 1200, height: 800, borderRadius: 3, ml: 7 }}>
                    <PageHeader text={name} />
                </Paper>
            </StyledPageView>
        );
    }

    return (
        <StyledPageView>
            <Paper
                className={"page-view-paper"}
                sx={{ width: 1200, height: 800, borderRadius: 3, ml: 7 }}>
                <PageHeader text={name} background={background} />
                <DocumentBlocksList canEdit docs={page.documentBlocks} />
            </Paper>
        </StyledPageView>
    );
};

export default PageView;
