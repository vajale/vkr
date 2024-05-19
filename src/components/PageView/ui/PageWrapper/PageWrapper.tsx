import { useFetchPageDataQuery } from "@/api/firebasePageAPI/pagesService";
import React, { useEffect } from "react";
import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
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
            dispatch(pageActions.setPage(data));
        }
    }, [data]);

    if (isLoading) {
        return <SkeletonPage/>;
    }

    if (page === undefined) {
        return (
            <StyledPageView>
                <DefaultPage/>
            </StyledPageView>
        );
    }

    return (
        <StyledPageView>
            {isSuccess && <PageView id={pageId} page={page} isLoading={isLoading}/>}
        </StyledPageView>
    );
};

export default PageWrapper;
