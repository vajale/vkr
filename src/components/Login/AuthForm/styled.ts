import { Box, Button, Paper, Stack, styled } from "@mui/material";
import type { IExtendedThemeProps } from "@/themes/types";

export const StyledAuthBox = styled('div')({
    display: 'flex',
});

export const StyledAuthPaper = styled(Paper)({
    width: "100%",
    height: "100%",
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: "column",
});

export const StyledLoginButton = styled(Button)(({ theme }: IExtendedThemeProps) => {
    return {
        height: '49px',
        backgroundColor: theme?.menuBackground.third,
    };
});
