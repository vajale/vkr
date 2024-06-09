import React from "react";
import { MainLayout } from "@/components/layouts/main/MainLayout";
import { useGetPageRealtimeDataQuery } from "@/api/pageRealtimeUpdate";
import { useAppSelector } from "@/store/hooks";
import { selectUserAuth } from "@/store/slices/userSlice";
import DefaultPage from "@/components/PageView/ui/DefaultPage/DefaultPage";
import { StyledPageWrapper } from "@/components/PageView/ui/PageView/styled";

export const HomePage = () => {
    // const user = useAppSelector(selectUserAuth);
    // console.log(user);
    // const { data, isLoading } = useGetPageRealtimeDataQuery("susuke");
    // console.log("realtimeData");
    // console.log(data);
    // console.log(isLoading);
    // console.log("  ");
    // console.log("  ");
    // console.log("  ");
    return (
        <MainLayout>
            <StyledPageWrapper>
                <DefaultPage/>
            </StyledPageWrapper>
        </MainLayout>
    );
};
