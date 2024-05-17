import React, { memo, useEffect, useMemo } from "react";

import { StyledMainLayout, StyledContentWrapper } from "./styled";
import AppHeader from "../../AppHeader";
import { Button, Skeleton, Stack, Typography } from "@mui/material";
import PageLink from "@/components/PageLink/PageLink";
import { useNavigate } from "react-router-dom";
import Constants from "@/constants";
import { useGetUserQuery } from "@/features/usersService/usersService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser, selectUserPages, userActions } from "@/store/slices/userSlice";
import { firebaseAuth, useFirebaseAuth } from "@/components/FireBase";
import PagesList from "@/components/layouts/main/PagesList";

interface LayoutProps {
    children: React.ReactNode | React.ReactElement
}

export const MainLayout: React.FC<LayoutProps> = memo((props) => {
    const { children } = props;

    const auth = useFirebaseAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // TODO апдейт названия страницы

    const { data: userData, refetch, isLoading, isSuccess } = useGetUserQuery({ userId: firebaseAuth.currentUser?.uid });

    useEffect(() => {
        if (isSuccess) {
            dispatch(userActions.setAuthData(userData));
        }
    }, [isSuccess, isLoading, userData]);

    const handleMainButton = () => {
        navigate(Constants.URL.HOME);
    };

    const handlePageChanged = () => {
        void refetch();
    };

    return (
        <StyledMainLayout>
            <StyledContentWrapper>
                <Stack padding={3} gap={1}
                       style={{
                           width: 300,
                           height: 800,
                           position: "sticky"
                       }}>
                    <Typography className={"main-button"} mb={4} variant={'h5'} fontWeight={900}
                                onClick={handleMainButton}>
                        СЕЙФ +
                    </Typography>
                    <PageLink id={''} href={'/calendar'} label={'Поиск'} icon={"MdSearch"}/>
                    <Stack mt={4}>
                        <PageLink id={''} href={'/calendar'} label={'Календарь'} icon={"MdCalendarToday"}/>
                        <PageLink id={''} href={'/calendar'} label={'Участники'} icon={"MdGroup"}/>
                    </Stack>
                    <PagesList onPageChanged={handlePageChanged}/>
                </Stack>
            </StyledContentWrapper>
            <div className={"side-menu"}>
                <AppHeader/>
                {children}
            </div>
        </StyledMainLayout>
    );
});
