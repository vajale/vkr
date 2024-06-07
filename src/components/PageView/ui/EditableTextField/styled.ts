import { Button, Stack, styled } from "@mui/material";
import type { IExtendedThemeProps } from "@/themes/types";
import { motion } from "framer-motion";

export const StyledEditorButtonsContainer = styled(Stack)(({ theme }: IExtendedThemeProps) => ({
    position: "absolute",
    padding: 7,
    borderRadius: 7,
    top: -50,
    backgroundColor: theme?.menuBackground.primary,
    minWidth: 300,
    zIndex: 100,
    maxHeight: 20,
    minHeight: 20
}));

export const StyledEditorButton = styled(Button)(({ theme }: IExtendedThemeProps) => ({
    height: 20,
    maxWidth: 30,
    minWidth: 25
}));

export const StyledMotionDiv = styled(motion.div)(({ isEmpty }: { isEmpty?: boolean }) => ({
    backgroundColor: isEmpty ? "whitesmoke" : "transparent",
    transition: "1 ease-out",
    borderRadius: 7,
    padding: 7,
}));
