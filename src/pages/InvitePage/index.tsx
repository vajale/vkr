import React, { useEffect, useState } from "react";
import { LandingLayout } from "@/components/layouts/landing";
import ModalComponent from "@/components/Modal";
import { StyledInvitePage } from "@/pages/InvitePage/styled";
import { Typography } from "@/components/common/CustomTypography";
import { useFirebaseAuth } from "@/components/FireBase";
import { useNavigate, useParams } from "react-router-dom";
import { NAVIGATION } from "@/constants/navigation";
import { useUpdateUserPermissionMutation } from "@/api/firebasePageAPI/pagesService";
import { UserPermission } from "@/components/StatickBlocks/Members/PermissionSelect";

export const InvitePage = () => {
    const {
        isAuth,
        authState: [user],
    } = useFirebaseAuth();
    const id = useParams();
    const navigate = useNavigate();

    const [clicked, setIsClicked] = useState(false);

    const [updatePermissions, { data, isLoading, isSuccess }] = useUpdateUserPermissionMutation();

    const onClose = () => {
        console.log("onClose");
    };

    const handleAccept = () => {
        setIsClicked(true);
        void updatePermissions({
            pageId: id.id,
            userId: user?.uid,
            newPermission: UserPermission.MODERATOR,
        });
    };

    useEffect(() => {
        if (!isLoading && clicked && isSuccess && id.id) {
            setTimeout(() => {
                navigate(`${NAVIGATION.PAGE}${id.id}`, { replace: true });
            }, 3000);
        }
    }, [clicked, isLoading]);

    const navigateToLandig = () => {
        navigate(NAVIGATION.LANDING.MAIN, { replace: true });
    };

    const handleAuth = () => {
        navigateToLandig();
    };

    const handleReject = () => {
        navigateToLandig();
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
                    <Typography className={"title"}>{``}</Typography>
                    <Typography className={"pageId"}>
                        Вы прилашены к редактированию страницы!
                    </Typography>
                </div>
                <div className={"select-buttons"}>
                    <button className={"button accept"} onClick={handleAccept}>
                        Принять
                    </button>
                    <button className={"button reject"} onClick={handleReject}>
                        Отказаться
                    </button>
                </div>
            </StyledInvitePage>
        );
    };

    return (
        <LandingLayout disableAlarm={true}>
            <ModalComponent
                height={"20vh"}
                minHeight={"fit-content"}
                width={"fit-content"}
                onModalClose={onClose}
                modalOpen={true}>
                {ModalContent()}
            </ModalComponent>
        </LandingLayout>
    );
};
