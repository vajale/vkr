import React, { useMemo } from "react";
import ModalComponent from "@/components/Modal";
import { MainButton } from "@/components/buttons/MainButton";
import { StyledMembers, StyledUser } from "@/components/StatickBlocks/Members/styled";
import { Typography } from "@/components/common/CustomTypography";
import { Button, TextField } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { selectPage } from "@/store/slices/pageSlice";
import {
    PermissionSelect,
    UserPermission,
} from "@/components/StatickBlocks/Members/PermissionSelect";
import { type IPermissionSelect } from "@/components/StatickBlocks/Members/PermissionSelect/types";
import { useParams } from "react-router-dom";

const UserElement: React.FC<IPermissionSelect> = ({ userId, userPermission }) => {
    return (
        <StyledUser>
            <div className={"user-profile"}>
                <img alt={"s"} />
                <div className={"user"}>
                    <div className={"main-data"}>
                        Hueglot Pizsyanuhaev {/* <div className={"role"}>Гость</div> */}
                    </div>
                    <Typography className={"mail"}>huesos@gmail.com</Typography>
                </div>
            </div>
            <PermissionSelect userId={userId} userPermission={userPermission} />
        </StyledUser>
    );
};

export const Members: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const page = useAppSelector(selectPage);
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
                            <div className={"users"}>
                                <UserElement
                                    userPermission={UserPermission.MODERATOR}
                                    userId={"hui"}
                                />
                                <UserElement
                                    userPermission={UserPermission.READER}
                                    userId={"hui"}
                                />
                                <UserElement
                                    userPermission={UserPermission.READER}
                                    userId={"hui"}
                                />
                                <UserElement
                                    userPermission={UserPermission.READER}
                                    userId={"hui"}
                                />
                                <UserElement
                                    userPermission={UserPermission.READER}
                                    userId={"hui"}
                                />
                            </div>
                        </div>
                    </div>
                </StyledMembers>
            </ModalComponent>
        </div>
    );
};
