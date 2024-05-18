import { styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

export const StyledLandingRouteButtons = styled("div")(({ theme }: IExtendedThemeProps) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Inter, sans-serif",
    width: "30%",

    p: {
        fontSize: theme?.textSize.sizeText24,
    },
}));
