import { useFetchPageDataQuery } from "@/api/firebasePageAPI/pagesService";
import React, { useEffect } from "react";
import { StyledPageView, StyledPageWrapper } from "@/components/PageView/ui/PageView/styled";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import PageView from "@/components/PageView/ui/PageView/PageView";
import { pageActions, selectPage } from "@/store/slices/pageSlice";
import DefaultPage from "@/components/PageView/ui/DefaultPage/DefaultPage";
import SkeletonPage from "../PageView/SkeletonPage";
import { useGetPageRealtimeDataQuery } from "@/api/pageRealtimeUpdate";

interface WrapperProps {
    pageId: string
}

const PageWrapper = ({ pageId }: WrapperProps) => {
    const dispatch = useAppDispatch();

    const { data, isLoading, isSuccess } = useGetPageRealtimeDataQuery({ pageId });
    const page = useAppSelector(selectPage);

    useEffect(() => {
        if (isSuccess) {
            console.log(data);

            dispatch(pageActions.setPage(data.page));
            dispatch(pageActions.setPermissionData(data.permissions));
        }
    }, [data]);

    if (page === undefined) {
        return (
            <StyledPageWrapper>
                <DefaultPage/>
            </StyledPageWrapper>
        );
    }

    return (
        <StyledPageWrapper>
            {isLoading
                ? <SkeletonPage/>
                : <PageView id={pageId} page={page} isLoading={isLoading}/>}
        </StyledPageWrapper>
    );
};

export default PageWrapper;
