import { styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

export const StyledLandingRouteButtons = styled("div")(({ theme }: IExtendedThemeProps) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Inter, sans-serif",
    width: "20%",

    a: {
        textDecoration: "none !important",
        cursor: "pointer",
    },

    ".active": {
        fontWeight: "bold",
        fontSize: theme?.textSize.sizeText24,
    },

    p: {
        fontSize: theme?.textSize.sizeText24,
    },
}));
