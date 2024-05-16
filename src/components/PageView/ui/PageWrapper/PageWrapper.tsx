import { useFetchPageDataQuery } from "@/components/PageView/model/services/firebaseDocumentsAPI";
import React, { useEffect } from "react";
import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import PageView from "@/components/PageView/ui/PageView/PageView";
import { pageActions, selectPage } from "@/store/slices/pageSlice";
import DefaultPage from "@/components/PageView/ui/DefaultPage/DefaultPage";
import SkeletonPage from "../PageView/SkeletonPage";

interface WrapperProps {
    id: string
}

const PageWrapper = ({ id }: WrapperProps) => {
    const dispatch = useAppDispatch();

    const { data, isLoading, isSuccess } = useFetchPageDataQuery({ pageId: id });
    const page = useAppSelector(selectPage);

    useEffect(() => {
        if (isSuccess) {
            dispatch(pageActions.setPage(data));
        }
    }, [data, isSuccess, id]);

    if (page === undefined) {
        return (
            <StyledPageView>
                <DefaultPage/>
            </StyledPageView>
        );
    }

    if (isLoading) {
        return <SkeletonPage/>;
    }

    return (
        <StyledPageView>
            {isSuccess ? <PageView id={id} page={page} isLoading={isLoading}/> : <DefaultPage/>}
        </StyledPageView>
    );
};

export default PageWrapper;
