import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/userSlice";
import { useFirebaseAuth } from "@/components/FireBase";
import React from "react";
import { Button, Paper, Popover, Stack, Typography } from "@mui/material";
import { AccountButton } from "@/components/Login/AccountButton";
import NotLoggedSvg from "@/assets/svg/NotLoggedAvatar.svg";

const AuthProfilePopover = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | EventTarget>(null);

    const { signOutUser } = useFirebaseAuth();
    const user = useSelector(selectUser);

    // @ts-expect-error
    const handleClick = (eventTarget: EventTarget) => {
        setAnchorEl(eventTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <AccountButton onClick={handleClick} image={NotLoggedSvg} accountName={user?.username}/>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Paper sx={{ p: 2, width: 370 }}>
                    <Stack flexDirection={'row'}>
                        <Typography variant={'h6'}>id:</Typography>
                        <Typography variant={'h6'} sx={{ opacity: 0.8 }}>{user?.id}</Typography>
                    </Stack>
                    <Button sx={{ mt: 2, width: 140 }} variant={'outlined'} onClick={async () => { await signOutUser(); }}>Выйти</Button>
                </Paper>
            </Popover>
        </div>
    );
};

export default AuthProfilePopover;
