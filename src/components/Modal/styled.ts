import { Box, styled } from "@mui/material";
import type { IExtendedThemeProps } from "@/themes/types";

interface IModalProps extends IExtendedThemeProps {
    width?: string;
    minWidth?: string;
    height?: string;
    minHeight?: string;
}

export const StyledLoginWrapper = styled(Box)(({
    minHeight,
    theme,
    width,
    height,
}: IModalProps) => {
    return {
        height: height ?? "600px",
        minWidth: width ?? "400px",
        minHeight: minHeight ?? "280px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: theme?.menuBackground.primary,
        borderRadius: "14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        fieldset: {
            borderColor: theme?.palette?.borderColors.primary,
        },

        ".login-title": {
            fontSize: 20,
            margin: "20px 0",
        },
    };
});
