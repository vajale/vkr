import React, { useCallback, useEffect } from "react";

import PageHeader from "../PageHeader/PageHeader";

import {
    useUpdatePageBlocksMutation,
    useUpdatePageVisualMutation,
} from "@/api/firebasePageAPI/pagesEndpoins";
import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import DocumentBlocksList from "@/components/PageView/ui/PageView/DocumentBlocksList";
import { type Page } from "../../model/types";
import { pageActions, selectPagePermission } from "@/store/slices/pageSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUserAuth, selectUserId } from "@/store/slices/userSlice";
import { UserPermission } from "@/components/StatickBlocks/Members/PermissionSelect";
import { useFirebaseAuth } from "@/components/FireBase";

interface ViewProps {
    isLoading: boolean;
    page: Page;
    id: string;
}

const PageView = (props: ViewProps) => {
    const { isLoading, page } = props;

    const { refetchUserData } = useFirebaseAuth();

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectUserAuth);
    const userId = useAppSelector(selectUserId);
    const usersPermission = useAppSelector(selectPagePermission);

    const [updateDocuments] = useUpdatePageBlocksMutation();
    const [updateVisual] = useUpdatePageVisualMutation();

    useEffect(() => {
        if (!isLoading) {
            void updateVisual({ newPage: page });
        }
    }, [page.visual]);

    useEffect(() => {
        if (!isLoading) {
            void updateDocuments({ newPage: page });
        }
    }, [page.documentBlocks]);

    const handleHeaderChange = (content: string) => {
        dispatch(pageActions.updateHeader({ name: content }));
    };

    const handleLazyBlocksUpdate = useCallback(() => {
        if (!isLoading) {
            console.log(page);
            debugger;
            void updateDocuments({ newPage: page });
        }
    }, [page, isLoading]);

    const isHaveDocBlocks = page.documentBlocks !== undefined;

    const blocks = page.documentBlocks ?? [];

    const canEditPage = isAuth && usersPermission[userId as never] !== UserPermission.READER;

    return (
        <StyledPageView>
            <PageHeader onContentChange={handleHeaderChange}
                        onFavoritesAdd={refetchUserData}
                        canEdit={canEditPage}
                        page={page}
            />
            {isHaveDocBlocks && <DocumentBlocksList onDocumentsChanges={handleLazyBlocksUpdate} canEdit={canEditPage} docs={blocks}/>}
        </StyledPageView>
    );
};

export default PageView;
