import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/userSlice";
import { firebaseAuth, useFirebaseAuth } from "@/components/FireBase";
import React, { useEffect } from "react";
import { Button, Paper, Popover, Stack, Typography } from "@mui/material";
import { AccountButton } from "@/components/Login/AccountButton";
import NotLoggedSvg from "@/assets/svg/NotLoggedAvatar.svg";
import { useLazyGetUserProfileDataQuery } from "@/api/userProfile";
import { StyledPaper } from "@/components/AuthProfilePopover/styled";
import { FileUpload } from "@/components/AuthProfilePopover/FileUpload";

const AuthProfilePopover = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | EventTarget>(null);
    const userId = firebaseAuth?.currentUser?.uid;
    const [getUserProfile, { data: profilePicture }] = useLazyGetUserProfileDataQuery();

    const { signOutUser } = useFirebaseAuth();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (userId) {
            getUserProfile({ userId });
        }
    }, [userId]);

    // @ts-expect-error
    const handleClick = (eventTarget: EventTarget) => {
        setAnchorEl(eventTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

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
                    <Stack flexDirection={"row"}>
                        <Typography variant={"h6"}>id:</Typography>
                        <Typography variant={"h6"} sx={{ opacity: 0.8 }}>
                            {user?.id}
                        </Typography>
                    </Stack>
                    <Button
                        sx={{ width: 140 }}
                        variant={"outlined"}
                        onClick={async () => {
                            await signOutUser();
                        }}>
                        Выйти
                    </Button>
                    <FileUpload />
                </StyledPaper>
            </Popover>
        </div>
    );
};

export default AuthProfilePopover;
