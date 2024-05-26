import { styled } from "@mui/material";
import type { IExtendedThemeProps } from "@/themes/types";

export const StyledPageLink = styled("div")(({ theme }: IExtendedThemeProps) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // height: '100%',
    a: {
        fontFamily: "Inter",
        fontWeight: 500,
    },
}));
