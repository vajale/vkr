import {useSelector} from "react-redux";
import {selectUser} from "@/store/slices/userSlice";
import {useFirebaseAuth} from "@/components/FireBase";
import React from "react";
import {StyledAccountButton} from "@/components/Login/AccountButton/styled";
import {Button, Paper, Popover, Stack, Typography} from "@mui/material";
import {Settings} from "@material-ui/icons";

const AuthProfilePopover = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const {signOutUser} = useFirebaseAuth()
    const user = useSelector(selectUser)

    // @ts-ignore
    const handleClick = (event) => {
        setAnchorEl(event.target);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <StyledAccountButton onClick={handleClick}>
                <Typography>{user?.username}</Typography>
            </StyledAccountButton>
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
                <Paper sx={{p: 2, width: 370}}>
                    <Stack flexDirection={'row'}>
                        <Typography variant={'h6'}>id:</Typography>
                        <Typography variant={'h6'} sx={{opacity: 0.8}}>{user?.id}</Typography>
                    </Stack>
                    <Button sx={{mt: 2, width: 140}} variant={'outlined'} onClick={() => signOutUser()}>Выйти</Button>
                </Paper>
            </Popover>
        </div>
    )
}

export default AuthProfilePopover