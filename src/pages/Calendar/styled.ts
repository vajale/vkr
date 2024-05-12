import { Box, Stack, styled } from "@mui/material";
import type { IExtendedThemeProps } from "@/themes/types";

export const StyledCalendarGrid = styled(Stack)({
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: 'repeat(7, 1fr)'
});

export const StyledCreateTaskModal = styled(Box)(({ theme }: IExtendedThemeProps) => {
    return {

        minWidth: "350px",
        minHeight: "320px",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: theme?.menuBackground.primary,
        borderRadius: "14px",
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        border: 'none',

        ".login-title": {
            fontSize: 20,
            margin: '20px 0',
        },
    };
});
