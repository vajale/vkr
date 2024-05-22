import React, { useEffect, useRef } from "react";

import PageHeader from "../PageHeader/PageHeader";

import {
    useUpdatePageBlocksMutation,
    useUpdatePageVisualMutation,
} from "@/api/firebasePageAPI/pagesService";
import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import DocumentBlocksList from "@/components/PageView/ui/PageView/DocumentBlocksList";
import { type Page } from "../../model/types";
import { pageActions, selectPagePermission } from "@/store/slices/pageSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUserAuth, selectUserId } from "@/store/slices/userSlice";
import { UserPermission } from "@/components/StatickBlocks/Members/PermissionSelect";

interface ViewProps {
    isLoading: boolean;
    page: Page;
    id: string;
}

const PageView = (props: ViewProps) => {
    const { isLoading, page } = props;

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

    const headerText = page.visual?.name ?? 'Новая страница';
    const isHaveDocBlocks = page.documentBlocks !== undefined;
    const blocks = page.documentBlocks ?? [];

    console.log(usersPermission[userId]);

    const canEditPage = isAuth && usersPermission[userId] !== UserPermission.READER;

    return (
        <StyledPageView>
            <PageHeader onContentChange={handleHeaderChange}
                        text={headerText}
                        background={page.visual?.background}
                        canEdit={canEditPage}
            />
            {isHaveDocBlocks && <DocumentBlocksList canEdit={canEditPage} docs={blocks}/>}
        </StyledPageView>
    );
};

export default PageView;
