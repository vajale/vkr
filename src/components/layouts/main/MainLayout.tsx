import React, { memo, Suspense, useEffect } from "react";

import { StyledMainLayout, StyledContentWrapper } from "./styled";
import AppHeader from "../../AppHeader";
import { CircularProgress, Stack } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { userActions } from "@/store/slices/userSlice";
import { firebaseAuth, useFirebaseAuth } from "@/components/FireBase";
import PagesList from "@/components/layouts/main/PagesList";
import { useGetUserByIdQuery } from "@/api/usersApi/usersFirebaseEndpoints";

interface LayoutProps {
    children: React.ReactNode | React.ReactElement;
}

export const MainLayout: React.FC<LayoutProps> = memo((props) => {
    const { children } = props;

    // не убирать, ато нихуя ничего не работает
    const { refetchUserData } = useFirebaseAuth();

    // TODO апдейт названия страницы

    const handlePageChanged = () => {
        refetchUserData();
    };

    return (
        <StyledMainLayout>
            <StyledContentWrapper>
                <PagesList onPageChanged={handlePageChanged}/>
            </StyledContentWrapper>
            <div className={"side-menu"}>
                <AppHeader/>
                {children}
            </div>
        </StyledMainLayout>
    );
});
