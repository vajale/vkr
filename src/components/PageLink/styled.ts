import { styled } from "@mui/material";
import type { IExtendedThemeProps } from "@/themes/types";

export const StyledPageLink = styled("div")(({ theme }: IExtendedThemeProps) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "&:hover": {
        backgroundColor: theme?.menuBackground.primary,
        scale: 1.1,
        borderRadius: 7
    },
}));
