import React, { useMemo } from "react";
import ModalComponent from "@/components/Modal";
import { MainButton } from "@/components/buttons/MainButton";
import {
    StyledMembers,
    StyledUser,
    StyledUserSkeleton,
} from "@/components/StatickBlocks/Members/styled";
import { Typography } from "@/components/common/CustomTypography";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { selectPage, selectPageId } from "@/store/slices/pageSlice";
import {
    PermissionSelect,
    UserPermission,
} from "@/components/StatickBlocks/Members/PermissionSelect";
import { type IPermissionSelect } from "@/components/StatickBlocks/Members/PermissionSelect/types";
import { useParams } from "react-router-dom";
import { useGetUsersWithPermissionsQuery } from "@/api/firebasePageAPI/pagesEndpoins";
import { useGetUserByIdQuery } from "@/api/usersApi/usersFirebaseEndpoints";
import { selectUserId } from "@/store/slices/userSlice";
import { useGetUserProfileDataQuery } from "@/api/userProfile";
import { useFirebaseAuth } from "@/components/FireBase";
import NotLoggedSvg from "@/assets/svg/NotLoggedAvatar.svg";

const permissionName = {
    [UserPermission.CREATOR]: "Создатель",
    [UserPermission.READER]: "Читатель",
    [UserPermission.MODERATOR]: "Модератор",
};

const UserElement: React.FC<IPermissionSelect> = ({ userId, userPermission, pageId }) => {
    const clientUserId = useAppSelector(selectUserId);

    const { firebaseUser } = useFirebaseAuth();

    const { data, isLoading, isError } = useGetUserByIdQuery({ userId });

    const { data: profilePicture, isLoading: isLoadingPicture } = useGetUserProfileDataQuery({
        userId: firebaseUser?.id ?? "",
    });

    if (!data) {
        return null;
    }

    if (isLoading) {
        return <StyledUserSkeleton />;
    }

    const isClientUser = clientUserId === userId;

    const getPicture = () => {
        if (isLoadingPicture) {
            return <CircularProgress />;
        }

        if (isError || !profilePicture) {
            return <img src={NotLoggedSvg} alt={"s"} />;
        }

        return <img src={profilePicture} alt={"s"} />;
    };

    return (
        <StyledUser outlined={isClientUser}>
            <div className={"user-profile"}>
                {getPicture()}
                <div className={"user"}>
                    <div className={"main-data"}>
                        {data?.username?.split(" ")[0]}
                        <div className={"role"}>{permissionName[userPermission]}</div>
                    </div>
                    <Typography className={"mail"}>{data.data.phoneNumber}</Typography>
                </div>
            </div>
            <PermissionSelect pageId={pageId} userId={userId} userPermission={userPermission} />
        </StyledUser>
    );
};

export const Members: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const page = useAppSelector(selectPage);
    const id = useAppSelector(selectPageId);

    const { data, isLoading, isSuccess } = useGetUsersWithPermissionsQuery({ pageId: id });

    const handleClose = () => {
        setIsOpen(false);
    };

    const pageParams = useParams<{ id: string }>();
    const handleOpen = () => {
        if (!page) return;
        setIsOpen(true);
    };

    const link = useMemo(() => {
        return `https://vajale.github.io/vkr/#/invite/${pageParams?.id}`;
    }, [pageParams]);

    const handleCopy = async () => {
        if (!pageParams.id) {
            alert("Ошибка! Отсутствует id страницы.");
            return;
        }
        await navigator.clipboard.writeText(link);
    };

    const usersRender = useMemo(() => {
        return (
            data !== undefined && (
                <div className={"users"}>
                    <div className={"creator"}>
                        {data.creators.map((user) => (
                            <UserElement
                                pageId={id}
                                key={user}
                                userPermission={UserPermission.CREATOR}
                                userId={user}
                            />
                        ))}
                    </div>
                    <div className={"moders"}>
                        {data.moderators.map((user) => (
                            <UserElement
                                pageId={id}
                                key={user}
                                userPermission={UserPermission.MODERATOR}
                                userId={user}
                            />
                        ))}
                    </div>
                    <div className={"reader"}>
                        {data.readers.map((user) => (
                            <UserElement
                                pageId={id}
                                key={user}
                                userPermission={UserPermission.READER}
                                userId={user}
                            />
                        ))}
                    </div>
                </div>
            )
        );
    }, [isSuccess, isLoading]);

    return (
        <div>
            <MainButton onClick={handleOpen} />
            <ModalComponent modalOpen={isOpen} onModalClose={handleClose}>
                <StyledMembers>
                    <div className={"header"}>
                        Настройки страницы
                        <Typography>{page?.visual?.name ?? ""}</Typography>
                    </div>
                    <div className={"invite-wrapper"}>
                        <TextField
                            className={"link"}
                            disabled={true}
                            label={"Ссылка на документ"}
                            value={link}
                        />
                        <Button className={"copy"} onClick={handleCopy}>
                            Копировать
                        </Button>
                    </div>
                    <div className={"members"}>
                        <Typography className={"title"}>Участники страницы:</Typography>
                        <div className={"mem-list"}>
                            <div className={"maintainer"}></div>
                            <div className={"users"}>{usersRender}</div>
                        </div>
                    </div>
                </StyledMembers>
            </ModalComponent>
        </div>
    );
};
