import { styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

export const StyledMainButton = styled("button")(({ theme }: IExtendedThemeProps) => ({
    display: "flex",
    alignItems: "center",
    felxDirection: "row",
    gap: "8px",
    padding: "7px",
    border: "7px",
    width: "100%",
    background: "none",
    "&:hover": {
        backgroundColor: theme?.menuBackground.primary,
        scale: 1.1,
        borderRadius: 7,
    },
    p: {
        fontFamily: "Inter",
        fontWeight: 500,
    },
}));
