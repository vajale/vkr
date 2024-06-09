import { Box, Stack, styled } from "@mui/material";
import type { IExtendedThemeProps } from "@/themes/types";
import { motion } from "framer-motion";

export const StyledCalendarGrid = styled(Stack)(({ theme }: IExtendedThemeProps) => ({
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: 'repeat(7, 1fr)',
    backgroundColor: theme?.menuBackground.third,
}));

export const StyledCalendarCell = styled(motion.button)(({ theme }: IExtendedThemeProps) => ({
    border: 'none',
    height: 90,
    width: 160,
    padding: 7,
    backgroundColor: theme?.menuBackground.third,
    borderRadius: 7,
}));

export const StyledCreateTaskModal = styled(Box)(({ theme }: IExtendedThemeProps) => ({
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
}));
