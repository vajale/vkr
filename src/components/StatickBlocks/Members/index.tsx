import React, { useEffect, useMemo, useState } from "react";
import ModalComponent from "@/components/Modal";
import { MainButton } from "@/components/buttons/MainButton";
import { StyledMembers, StyledUser } from "@/components/StatickBlocks/Members/styled";
import { Typography } from "@/components/common/CustomTypography";
import { Button, TextField } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { selectPage } from "@/store/slices/pageSlice";

const UserElement = () => {
    return (
        <StyledUser>
            <div className={"user-profile"}>
                <img alt={"s"} />
                <div className={"user"}>
                    <div className={"main-data"}>
                        Hueglot Pizsyanuhaev <div className={"role"}>Гость</div>
                    </div>
                    <Typography className={"mail"}>huesos@gmail.com</Typography>
                </div>
            </div>
            <div className={"permission"}>полный хуеглот</div>
        </StyledUser>
    );
};

export const Members: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const page = useAppSelector(selectPage);
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const link = useMemo(() => {
        return `hui hui ${page?.id}`;
    }, [page]);

    const handleCopy = () => {
        return link;
    };

    console.log(page);

    return (
        <div>
            <MainButton onClick={handleOpen} />
            <ModalComponent modalOpen={isOpen} onModalClose={handleClose}>
                <StyledMembers>
                    <div className={"header"}>
                        Настройки страницы
                        <Typography>(Название сраницы)</Typography>
                    </div>
                    <div className={"invite-wrapper"}>
                        <TextField
                            className={"link"}
                            disabled={true}
                            label={"Ссылка на документ"}
                            value={"askjflksjdfhnjkjasdfhasjkdf"}
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
                                <UserElement />
                                <UserElement />
                                <UserElement />
                                <UserElement />
                            </div>
                        </div>
                    </div>
                </StyledMembers>
            </ModalComponent>
        </div>
    );
};
