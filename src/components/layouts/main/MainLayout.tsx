import React, { useEffect, useMemo } from "react";

import { StyledMainLayout, StyledContentWrapper } from "./styled";
import AppHeader from "../../AppHeader";
import { Button, Stack, Typography } from "@mui/material";
import PageLink from "@/components/PageLink/PageLink";
import { useFetchPagesQuery } from "@/components/PageView/model/services/firebaseDocumentsAPI";
import { MaterialIcon } from "@/assets/Icon";
import { useNavigate } from "react-router-dom";
import Constants from "@/constants";
import { useGetUserQuery } from "@/features/usersService/usersService";
import { useAppDispatch } from "@/store/hooks";
import { userActions } from "@/store/slices/userSlice";
import { firebaseAuth } from "@/components/FireBase";

interface LayoutProps {
    children: React.ReactNode | React.ReactElement;
}

export const MainLayout: React.FC<LayoutProps> = (props) => {
    const { children } = props;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { data, isLoading, isSuccess } = useGetUserQuery(
        {
            userId: firebaseAuth?.currentUser?.uid ?? "",
        },
        { skip: !firebaseAuth?.currentUser?.uid },
    );
    const {
        data: pagesData,
        isLoading: pagesIsLoading,
        isSuccess: pagesSuccess,
    } = useFetchPagesQuery(["VT8LVZQgp6WTGxScgr7E"]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(userActions.setAuthData(data));
        }
    }, [data, isLoading]);

    const pages = useMemo(() => {
        if (pagesSuccess) {
            return pagesData?.map((page) => (
                <PageLink
                    showOptionsButton
                    href={page.id}
                    key={page.id}
                    label={page.name}
                    width={290}
                    icon={"MdSummarize"}
                />
            ));
        }

        return null;
    }, [pagesData, pagesIsLoading]);

    const handleAddPageClick = () => {};

    const handleMainButton = () => {
        navigate(Constants.URL.HOME);
    };

    return (
        <StyledMainLayout>
            <StyledContentWrapper>
                <Stack
                    padding={3}
                    gap={1}
                    style={{
                        width: 300,
                        height: 800,
                        position: "sticky",
                    }}>
                    <Typography
                        className={"main-button"}
                        mb={4}
                        variant={"h5"}
                        fontWeight={900}
                        onClick={handleMainButton}>
                        СЕЙФ +
                    </Typography>
                    <PageLink href={"/calendar"} label={"Поиск"} icon={"MdSearch"} />
                    <Stack mt={4}>
                        <PageLink href={"/calendar"} label={"Календарь"} icon={"MdCalendarToday"} />
                        <PageLink href={"/calendar"} label={"Участники"} icon={"MdGroup"} />
                    </Stack>
                    <Stack
                        mt={2}
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}>
                        <Typography>Страницы</Typography>
                        <Button sx={{ minWidth: 20 }} onClick={handleAddPageClick}>
                            <MaterialIcon name={"MdAdd"} />
                        </Button>
                    </Stack>
                    <Stack gap={1}>{pages}</Stack>
                </Stack>
            </StyledContentWrapper>
            <div className={"side-menu"}>
                <AppHeader />
                {children}
            </div>
        </StyledMainLayout>
    );
};
