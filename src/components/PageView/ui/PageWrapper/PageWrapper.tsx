import { useFetchPageDataQuery } from "@/components/PageView/model/services/firebaseDocumentsAPI";
import React, { useEffect } from "react";
import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import { useAppDispatch } from "@/store/hooks";
import PageView from "@/components/PageView/ui/PageView/PageView";

const PageWrapper = () => {
    const dispatch = useAppDispatch();

    const { isLoading, isError } = useFetchPageDataQuery({ userId: '2rLcXc4sd4WD97mu8o8jiyXRMxt1' });

    useEffect(() => {
        // const page: Page = {
        //     id: new Date().toDateString(),
        //     parent: null,
        //     documentBlocks: []
        // };

        // dispatch(documentPageActions.setPage(page));
    }, []);

    return (
        <StyledPageView>
            <PageView/>
        </StyledPageView>
    );
};

export default PageWrapper;
