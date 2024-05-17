import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/userSlice";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Popover, Typography } from "@mui/material";
import { AccountButton } from "@/components/Login/AccountButton";

import { useLazyGetUserProfileDataQuery } from "@/api/userProfile";
import { StyledPaper } from "@/components/AuthProfilePopover/styled";
import { FileUpload } from "@/components/AuthProfilePopover/FileUpload";
import { useAppSelector } from "@/store/hooks";
import { useFirebaseAuth } from "@/components/FireBase";
import DefaultProfile from "@/assets/png/ProfileImage.png";
import NotLoggedSvg from "@/assets/svg/NotLoggedAvatar.svg";

const AuthProfilePopover = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | EventTarget>(null);
    const [fileToUpload, setFileToUpload] = useState<null | File>(null);
    const userState = useAppSelector(selectUser);
    const [getUserProfile, { data: profilePicture }] = useLazyGetUserProfileDataQuery();

    const { signOutUser } = useFirebaseAuth();
    const user = useSelector(selectUser);

    const handleChange = (file: File) => {
        console.log(file);
        setFileToUpload(file);
    };

    useEffect(() => {
        if (userState) {
            getUserProfile({ userId: userState?.id });
        }
    }, [userState?.id]);

    // @ts-expect-error
    const handleClick = (eventTarget: EventTarget) => {
        setAnchorEl(eventTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const authProfileUrl = useMemo(() => {
        if (profilePicture && !fileToUpload) {
            return profilePicture;
        }
        if (fileToUpload) {
            return URL.createObjectURL(fileToUpload);
        }
        return DefaultProfile;
    }, [profilePicture, fileToUpload]);

    const Image = useMemo(() => {
        return <img src={authProfileUrl} alt={"user-photo"} />;
    }, [authProfileUrl]);

    return (
        <div>
            <AccountButton
                onClick={handleClick}
                image={profilePicture ?? NotLoggedSvg}
                accountName={user?.username}
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}>
                <StyledPaper>
                    <div className={"user-wrapper"}>
                        <Typography variant={"h6"}>{user?.username ?? "Имя Фамильев"}</Typography>
                        <Button
                            className={"logout"}
                            sx={{ width: 140 }}
                            onClick={async () => {
                                await signOutUser();
                            }}>
                            Выйти
                        </Button>
                    </div>
                    <div className={"user-photo-wrapper"}>{Image}</div>
                    <FileUpload handleChangeFile={handleChange} />
                </StyledPaper>
            </Popover>
        </div>
    );
};

export default AuthProfilePopover;
