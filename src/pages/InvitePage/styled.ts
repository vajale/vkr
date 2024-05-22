import { styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

export const StyledInvitePage = styled("div")(({ theme }: IExtendedThemeProps) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 25,
    alignItems: "center",
    margin: "20px 20px",
    justifyContent: "space-between",

    ".select-buttons": {
        display: "flex",
        gap: 10,
    },

    ".button": {
        borderRadius: 8,
        width: "200px",
        height: "40px",
        transition: "background 1.4s ease-in-out",
    },

    ".accept-active": {
        backgroundColor: "#BDECB6",
    },

    ".reject": {
        backgroundColor: "#F5E1A4",
    },

    ".host": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ".title": {
            fontFamily: "Inter, sans-serif",
            fontSize: theme?.textSize.sizeText28,
        },
        ".pageId": {
            fontFamily: "Inter, sans-serif",
            fontSize: theme?.textSize.sizeText20,
        },
    },
}));
