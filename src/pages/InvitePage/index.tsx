import React, { useEffect, useMemo, useState } from "react";
import { LandingLayout } from "@/components/layouts/landing";
import ModalComponent from "@/components/Modal";
import { StyledInvitePage } from "@/pages/InvitePage/styled";
import { Typography } from "@/components/common/CustomTypography";
import { useFirebaseAuth } from "@/components/FireBase";
import { useNavigate, useParams } from "react-router-dom";
import { NAVIGATION } from "@/constants/navigation";
import {
    useFetchPageDataQuery,
    useLazyFetchPageDataQuery,
    useUpdateUserPermissionMutation,
} from "@/api/firebasePageAPI/pagesEndpoins";
import { UserPermission } from "@/components/StatickBlocks/Members/PermissionSelect";
import { Stack } from "@mui/material";

export const InvitePage = () => {
    const {
        isAuth,
        authState: [user],
    } = useFirebaseAuth();
    const id = useParams();
    const navigate = useNavigate();

    const [updatePermissions, { data, isLoading, isSuccess }] = useUpdateUserPermissionMutation();
    const [getPageData, { data: pageData, isLoading: pageIsLoading, isError: pageError }] =
        useLazyFetchPageDataQuery();

    const onClose = () => {
        console.log("onClose");
    };

    const handleAccept = () => {
        try {
            getPageData({ pageId: id.id });
        } catch (e) {
            console.error("Ошибка страницы!");
        }

        void updatePermissions({
            pageId: id.id,
            userId: user?.uid,
            newPermission: UserPermission.MODERATOR,
        });
    };

    useEffect(() => {
        if (!isLoading && pageData && !pageIsLoading && isSuccess && id.id) {
            setTimeout(() => {
                navigate(`${NAVIGATION.PAGE}${id.id}`, { replace: true });
            }, 2000);
        }
    }, [pageIsLoading, isLoading, pageData, isSuccess]);

    useEffect(() => {
        if (pageError && !pageIsLoading) {
            setTimeout(() => {
                navigate(`${NAVIGATION.LANDING.MAIN}`, { replace: true });
            }, 3000);
        }
    }, [pageError, pageIsLoading]);

    const navigateToLandig = () => {
        navigate(NAVIGATION.LANDING.MAIN, { replace: true });
    };

    const handleAuth = () => {
        navigateToLandig();
    };

    const handleReject = () => {
        navigateToLandig();
    };

    const ErrorContent = () => {
        return (
            <StyledInvitePage>
                <Stack gap={4} alignItems="center">
                    <Typography className={"pageId"}>Ошибка!</Typography>
                    <Typography className={"title"}>Неверная ссылка-приглашение! </Typography>
                </Stack>
            </StyledInvitePage>
        );
    };

    const ModalContent = () => {
        if (!isAuth) {
            return (
                <StyledInvitePage>
                    <div className={"host"}>
                        <Typography className={"title"}>Вы не авторизованы!</Typography>
                    </div>
                    <button className={"button"} onClick={handleAuth}>
                        Войти
                    </button>
                </StyledInvitePage>
            );
        }

        return (
            <StyledInvitePage>
                <div className={"host"}>
                    <Typography className={"pageId"}>
                        Вы прилашены к редактированию страницы!
                    </Typography>
                </div>
                <div className={"select-buttons"}>
                    <button className={"button reject"} onClick={handleReject}>
                        Отказаться
                    </button>
                    <button
                        className={`button accept${pageData ? "-active" : ""}`}
                        onClick={handleAccept}>
                        Принять
                    </button>
                </div>
            </StyledInvitePage>
        );
    };

    const content = useMemo(() => {
        if (pageError) {
            return ErrorContent();
        }
        return ModalContent();
    }, [pageError, pageData]);

    return (
        <LandingLayout disableAlarm={true}>
            <ModalComponent
                height={"20vh"}
                minHeight={"fit-content"}
                width={"fit-content"}
                onModalClose={onClose}
                modalOpen={true}>
                {content}
            </ModalComponent>
        </LandingLayout>
    );
};
