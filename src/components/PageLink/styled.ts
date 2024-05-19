import { styled } from "@mui/material";
import type { IExtendedThemeProps } from "@/themes/types";

export const StyledPageLink = styled("div")(({ theme }: IExtendedThemeProps) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 24,
    padding: 7,
    a: {
        fontFamily: "Inter",
        fontWeight: 500,
    },
    "&:hover": {
        backgroundColor: theme?.menuBackground.primary,
        scale: 1.1,
        borderRadius: 7,
    },
}));
