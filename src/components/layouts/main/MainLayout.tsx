import React, { memo, Suspense, useEffect } from "react";

import { StyledMainLayout, StyledContentWrapper } from "./styled";
import AppHeader from "../../AppHeader";
import { CircularProgress, Stack } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { userActions } from "@/store/slices/userSlice";
import { firebaseAuth, useFirebaseAuth } from "@/components/FireBase";
import PagesList from "@/components/layouts/main/PagesList";
import { useGetUserByIdQuery } from "@/api/usersApi/usersFirebaseService";

interface LayoutProps {
    children: React.ReactNode | React.ReactElement;
}

export const MainLayout: React.FC<LayoutProps> = memo((props) => {
    const { children } = props;

    // не убирать, нихуя ничего не работает
    const auth = useFirebaseAuth();
    const dispatch = useAppDispatch();

    // TODO апдейт названия страницы

    // const { data, refetch, isLoading, isSuccess } = useGetUserByIdQuery({ userId: firebaseAuth.currentUser?.uid });
    //
    // useEffect(() => {
    //     if (isSuccess) {
    //         dispatch(userActions.setFirebaseData(data));
    //     }
    // }, [data]);

    const handlePageChanged = () => {
        // void refetch();
    };

    return (
        <StyledMainLayout>
            <StyledContentWrapper>
                <Stack
                    padding={3}
                    gap={1}
                    style={{ width: 300, height: 800, position: "sticky" }}>
                    <PagesList onPageChanged={handlePageChanged} />
                </Stack>
            </StyledContentWrapper>
            <div className={"side-menu"}>
                <AppHeader />
                {children}
            </div>
        </StyledMainLayout>
    );
});
