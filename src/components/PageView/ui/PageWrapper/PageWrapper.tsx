import { useFetchPageDataQuery } from "@/components/PageView/model/services/firebaseDocumentsAPI";
import React, { useEffect } from "react";
import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import { useAppDispatch } from "@/store/hooks";
import PageView from "@/components/PageView/ui/PageView/PageView";
import { type Page } from "@/components/PageView/model/types";
import { documentPageActions } from "@/store/slices/pageSlice";

const PageWrapper = () => {
    const dispatch = useAppDispatch();

    const { data, isLoading, isError, isSuccess } = useFetchPageDataQuery({ userId: '2rLcXc4sd4WD97mu8o8jiyXRMxt1' });
    console.log(data);

    useEffect(() => {
        // const page: Page = {
        //     id: new Date().toDateString(),
        //     parent: null,
        //     documentBlocks: []
        // };

        // if (isSuccess) {
        //     dispatch(documentPageActions.setPage(data[0]));
        // }
    }, [data]);

    return (
        <StyledPageView>
            <PageView/>
        </StyledPageView>
    );
};

export default PageWrapper;
